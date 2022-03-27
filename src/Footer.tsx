import React, { useCallback, useContext, useMemo, useState } from 'react';
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { PropsContext } from './Chatty';
import { IFooterProps, IMedia, MediaType } from './types/Chatty.types';
import { selectImage } from './utils/imagePicker';

function _Footer(props: IFooterProps) {
  const propsContext = useContext(PropsContext);
  const [message, setMessage] = useState<string>('');
  const [mentions] = useState(['JohnDoe']);
  const [foundedMentions, setFoundedMentions] = useState<string[]>([]);
  const [image, setImage] = useState<IMedia[] | undefined>();

  const cuttedText = useMemo(() => {
    if (props.replyingTo) {
      return props.replyingTo.text.slice(0, 100) + '...';
    }

    return null;
  }, [props?.replyingTo]);

  const onChangeText = useCallback(
    (text: string) => {
      const foundedMentions: string[] = [];

      // Iterate over all text
      text.split(' ').forEach((word) => {
        foundedMentions.push(
          // Check and push if word exists in mentions
          ...mentions.filter((mention) => {
            console.log(text, mention.indexOf(word));
            return (
              mention
                .toLowerCase()
                .indexOf(word.toLowerCase().replace('@', '')) != -1
            );
          })
        );
      });

      setFoundedMentions(foundedMentions);

      props.onChangeText(text);
      setMessage(text);
    },
    [props, mentions]
  );

  const onPressSend = useCallback(() => {
    props.onPressSend({
      text: message,
      repliedTo: props.replyingTo,
      media: image,
    });
    setMessage('');
    setImage([]);
  }, [message, props, image]);

  const onPressMention = (target: string) => {
    setMessage((prev) => {
      const messagesArray = prev.split(' ');
      const lastMessageIndex = messagesArray.length - 1;
      const lastMessage = messagesArray[lastMessageIndex];

      prev = prev.replace(lastMessage, '@' + target);

      return prev;
    });

    setFoundedMentions([]);
  };

  const renderMenu = useCallback(() => {
    if (message && foundedMentions.length > 0) {
      const splittedWords = message.split(' ');

      if (splittedWords[splittedWords.length - 1].startsWith('@')) {
        return (
          <Animated.View
            entering={FadeInDown}
            exiting={FadeOutDown}
            style={
              props.mentionStyles?.containerStyle ?? styles.mentionContainer
            }
          >
            {foundedMentions.map((mention) => (
              <TouchableOpacity onPress={() => onPressMention(mention)}>
                <Text
                  style={props.mentionStyles?.labelStyle ?? styles.mentionLabel}
                >
                  @{mention}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        );
      }
    }

    return null;
  }, [
    foundedMentions,
    message,
    props.mentionStyles?.containerStyle,
    props.mentionStyles?.labelStyle,
  ]);

  const onKeyPress = useCallback((key: string) => {
    if (key === ' ') {
      setFoundedMentions([]);
    }
  }, []);

  const onPressImage = useCallback(async () => {
    selectImage().then((r) => {
      const assets = {
        type: MediaType.Image,
        uri: r?.assets ? r.assets[0].uri : r.uri,
        base64: r?.assets ? r.assets[0].base64 : r.base64,
      };
      if (image) {
        setImage([...image, assets]);
      } else {
        setImage([assets]);
      }
    });
  }, [image]);

  return (
    <View
      style={
        image &&
        image.length > 0 && {
          position: 'absolute',
          bottom: -70,
          backgroundColor: '#fff',
        }
      }
    >
      {props.replyingTo && (
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOutDown}
          style={[styles.reply, props.replyStyles?.containerStyle]}
        >
          <View style={styles.replyBody}>
            <Text
              style={[styles.replyUsername, props.replyStyles?.usernameStyle]}
            >
              {props.replyingTo.user.username}
            </Text>
            <Text style={props.replyStyles?.labelStyle}>{cuttedText}</Text>
          </View>
          {propsContext.footerProps.closeReplyButton ? (
            propsContext.footerProps.closeReplyButton(props)
          ) : (
            <Button title="cancel" onPress={props.onPressCancelReply} />
          )}
        </Animated.View>
      )}

      {renderMenu()}

      <View style={[styles.container, props.containerStyle]}>
        {image && image.length > 0 && (
          <ScrollView horizontal pagingEnabled>
            {image.map((_image) => (
              <TouchableOpacity
                onPress={() =>
                  setImage((prev) => prev && prev.filter((v) => v !== _image))
                }
                style={styles.media}
              >
                <ImageBackground
                  style={[styles.mediaOverlay, { marginBottom: 15 }]}
                  source={{ uri: _image.uri }}
                  imageStyle={{
                    borderRadius: 15,
                  }}
                >
                  <View style={styles.media}>
                    <View style={styles.imageClearButton}>
                      <Text style={{ color: '#fff', textAlign: 'center' }}>
                        x
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={onPressImage}>
              <View style={styles.addMore}>
                <Text style={{ fontSize: 20, color: '#ccc' }}>+</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        )}

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            value={props.value ?? message}
            onChangeText={onChangeText}
            style={[
              propsContext?.enableImageUploads
                ? styles.shortedTextInput
                : styles.textInput,

              props?.inputStyle,
            ]}
            placeholder={props?.placeholder ?? 'Type a message...'}
            onKeyPress={(e) => onKeyPress(e.nativeEvent.key)}
          />

          {propsContext?.enableImageUploads && (
            <>
              {props?.renderImageAction ? (
                props.renderImageAction({
                  onPressImage,
                })
              ) : (
                <TouchableOpacity
                  onPress={onPressImage}
                  style={{ paddingHorizontal: 10 }}
                >
                  <Text style={{ fontSize: 20 }}>📷</Text>
                </TouchableOpacity>
              )}
            </>
          )}

          {props?.sendButton ? (
            props.sendButton({
              onPressSend: onPressSend,
            })
          ) : (
            <Button title="Send" onPress={onPressSend} color="#0084ff" />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  textInput: {
    padding: 10,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  shortedTextInput: {
    padding: 10,
    width: '70%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    width: '20%',
    backgroundColor: '#fcba03',
  },
  reply: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderLeftColor: '#c8faaf',
    borderLeftWidth: 6,
  },
  replyBody: {
    flex: 1,
  },
  replyUsername: {
    fontWeight: 'bold',
  },

  addMore: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
  },
  imageClearButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 18,
    height: 18,
    marginLeft: 10,
    marginTop: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  media: {
    width: 110,
    height: 100,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  mediaOverlay: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 15,
  },
  mentionContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    padding: 10,
    backgroundColor: '#E5EEFA',
  },
  mentionLabel: {
    padding: 10,
    color: '#1939B7',
  },
});

export const Footer = React.memo(_Footer);

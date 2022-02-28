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
import string from 'string-similarity';
import { PropsContext } from './Chatty';
import { IFooterProps, IMedia, MediaType } from './types/Chatty.types';
import { loadAnimated } from './utils/animated';
import { selectImage } from './utils/imagePicker';
import { AnimatedWrapper } from './wrappers/AnimatedWrapper';

const Animated = loadAnimated();
const FadeInDown = Animated.FadeInDown;
const FadeOutDown = Animated.FadeOutDown;

function _Footer(props: IFooterProps) {
  const propsContext = useContext(PropsContext);
  const [message, setMessage] = useState<string>('');
  const [mentions] = useState(['JohnDoe']);
  const [foundedMentions, setFoundedMentions] = useState<string[]>([]);
  const [image, setImage] = useState<IMedia[]>([]);

  const cuttedText = useMemo(() => {
    if (props.replyingTo) {
      return props.replyingTo.text.slice(0, 100) + '...';
    }

    return null;
  }, [props?.replyingTo]);

  const onChangeText = useCallback(
    (text: string) => {
      setMessage(text);

      const foundedMentions: string[] = [];

      text.split(' ').forEach((word) => {
        const bestMatches = string.findBestMatch(
          word.replace('@', ''),
          mentions
        );

        bestMatches.ratings.forEach((rating) => {
          if (rating.rating > 0.3) {
            foundedMentions.push(rating.target);
          }
        });
      });

      setFoundedMentions(foundedMentions);

      props.onChangeText(text);
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

      if (string.compareTwoStrings(lastMessage, target) > 0.3) {
        prev = prev.replace(lastMessage, '@' + target);
      }

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
            style={{
              position: 'absolute',
              bottom: 50,
              width: '100%',
              padding: 10,
              backgroundColor: '#ccc',
            }}
          >
            <Text style={{ fontSize: 17 }}>Mentions</Text>
            {foundedMentions.map((mention) => (
              <TouchableOpacity onPress={() => onPressMention(mention)}>
                <Text style={{ padding: 10 }}>{mention}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        );
      }
    }

    return null;
  }, [foundedMentions, message]);

  const onKeyPress = useCallback((key: string) => {
    if (key === ' ') {
      setFoundedMentions([]);
    }
  }, []);

  const onPressImage = useCallback(async () => {
    selectImage().then((r) =>
      setImage((prev) =>
        prev.concat({
          uri: r.uri,
          base64: r.base64,
          type: MediaType.Image,
        })
      )
    );
  }, []);

  return (
    <View
      style={
        image.length > 0 && {
          position: 'absolute',
          bottom: -100,
          backgroundColor: '#fff',
        }
      }
    >
      {props.replyingTo && (
        <AnimatedWrapper
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
        </AnimatedWrapper>
      )}

      {renderMenu()}

      <View style={[styles.container, props.containerStyle]}>
        {image.length > 0 && (
          <ScrollView horizontal pagingEnabled>
            {image.map((_image) => (
              <TouchableOpacity
                onPress={() =>
                  setImage((prev) => prev.filter((v) => v !== _image))
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
            style={[styles.textInput, props?.inputStyle]}
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
                <TouchableOpacity onPress={onPressImage}>
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
});

export const Footer = React.memo(_Footer);

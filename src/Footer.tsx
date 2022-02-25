import React, { useCallback, useContext, useState } from 'react';
import { useMemo } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import string from 'string-similarity';
import { PropsContext } from './Chatty';
import type { IFooterProps } from './types/Chatty.types';
import { loadAnimated } from './utils/animated';
import { AnimatedWrapper } from './wrappers/AnimatedWrapper';

const Animated = loadAnimated();
const FadeInDown = Animated.FadeInDown;
const FadeOutDown = Animated.FadeOutDown;

function _Footer(props: IFooterProps) {
  const propsContext = useContext(PropsContext);
  const [message, setMessage] = useState<string>('');
  const [mentions] = useState(['JohnDoe']);
  const [foundedMentions, setFoundedMentions] = useState<string[]>([]);

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
    });
    setMessage('');
  }, [message, props]);

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

  return (
    <View>
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
        <TextInput
          value={props.value ?? message}
          onChangeText={onChangeText}
          style={[styles.textInput, props?.inputStyle]}
          placeholder={props?.placeholder ?? 'Type a message...'}
          onKeyPress={(e) => onKeyPress(e.nativeEvent.key)}
        />
        {props?.sendButton ? (
          props.sendButton({
            onPressSend: onPressSend,
          })
        ) : (
          <Button title="Send" onPress={onPressSend} color="#0084ff" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
});

export const Footer = React.memo(_Footer);

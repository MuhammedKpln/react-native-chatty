import React, { useCallback, useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
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

  const onChangeText = useCallback(
    (text: string) => {
      setMessage(text);

      props.onChangeText(text);
    },
    [props]
  );

  const onPressSend = useCallback(() => {
    props.onPressSend({
      text: message,
      repliedTo: props.replyingTo,
    });
    setMessage('');
  }, [message, props]);

  return (
    <View>
      {props.replyingTo && (
        <AnimatedWrapper
          entering={FadeInDown}
          exiting={FadeOutDown}
          style={styles.reply}
        >
          <View style={styles.replyBody}>
            <Text style={styles.replyUsername}>
              {props.replyingTo.user.username}
            </Text>
            <Text>{props.replyingTo.text}</Text>
          </View>
          {propsContext.closeReplyButton ? (
            propsContext.closeReplyButton(props)
          ) : (
            <Button title="cancel" onPress={props.onPressCancelReply} />
          )}
        </AnimatedWrapper>
      )}

      <View style={styles.container}>
        <TextInput
          value={message}
          onChangeText={onChangeText}
          style={styles.textInput}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={onPressSend} color="#0084ff" />
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

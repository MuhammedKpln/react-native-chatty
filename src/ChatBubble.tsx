import React, { useContext } from 'react';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import type { IChatBubble } from './types/Chatty.types';
import dayjs from 'dayjs';
import { PropsContext } from './Chatty';
import type { ViewStyle } from 'react-native';
import { ReplyingTo } from './components/ReplyingTo';

function _ChatBubble(props: IChatBubble) {
  const { message, customContent } = props;
  const propsContext = useContext(PropsContext);

  const createdAt = useMemo(() => {
    return message && dayjs(message.createdAt).format('HH:mm');
  }, [message]);

  const bubbleBackgroundColor = useMemo<ViewStyle>(() => {
    if (message?.me) {
      return {
        backgroundColor:
          propsContext?.bubbleProps?.selfBubbleColor ?? '#afddfa',
        alignSelf: 'flex-end',
      };
    }

    return {
      backgroundColor: propsContext?.bubbleProps?.otherBubbleColor ?? '#c8faaf',
      alignSelf: 'flex-start',
    };
  }, [
    message?.me,
    propsContext?.bubbleProps?.otherBubbleColor,
    propsContext?.bubbleProps?.selfBubbleColor,
  ]);

  return (
    <View
      style={[
        styles.container,
        bubbleBackgroundColor,
        { padding: message?.repliedTo ? 5 : 15 },
      ]}
    >
      {customContent ? (
        customContent
      ) : (
        <>
          {message?.repliedTo && (
            <ReplyingTo
              username={message?.repliedTo?.user.username}
              text={message?.repliedTo.text}
            />
          )}

          <Text>{message?.text}</Text>
          <Text style={styles.date}>{createdAt}</Text>
        </>
      )}
    </View>
  );
}

export const ChatBubble = React.memo(_ChatBubble);

export const styles = StyleSheet.create({
  container: {
    margin: 10,
    maxWidth: 300,
    borderRadius: 10,
  },
  date: {
    color: '#a8a8a8',
    fontSize: 11,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});

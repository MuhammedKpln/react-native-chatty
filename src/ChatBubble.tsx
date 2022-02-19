import React from 'react';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import type { IChatBubble } from './types/Chatty.types';
import dayjs from 'dayjs';

function _ChatBubble(props: IChatBubble) {
  const { message } = props;
  const createdAt = useMemo(() => {
    return dayjs(message.createdAt).format('HH:mm');
  }, [message]);

  return (
    <View
      style={[
        styles.container,
        message.me
          ? { backgroundColor: '#afddfa', alignSelf: 'flex-end' }
          : { backgroundColor: '#c8faaf', alignSelf: 'flex-start' },
      ]}
    >
      <Text>{message.text}</Text>
      <Text style={styles.date}>{createdAt}</Text>
    </View>
  );
}

export const ChatBubble = React.memo(_ChatBubble);

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 15,
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

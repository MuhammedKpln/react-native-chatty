import React, { useCallback } from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ChatBubbleEmitter } from '../utils/eventEmitter';

function _ReplyingTo(props: {
  username: string;
  text: string;
  messageId: number;
}) {
  const { username, text, messageId } = props;

  const cuttedText = useMemo(() => {
    return text.slice(0, 100) + '...';
  }, [text]);

  const onPressChatBubble = useCallback(() => {
    ChatBubbleEmitter.emit('replyBubblePressed', messageId);
  }, [messageId]);

  return (
    <TouchableWithoutFeedback onPress={onPressChatBubble}>
      <View style={styles.reply}>
        <View style={styles.replyBody}>
          <Text style={styles.replyUsername}>{username}</Text>
          <Text>{cuttedText}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export const ReplyingTo = React.memo(_ReplyingTo);

const styles = StyleSheet.create({
  reply: {
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderLeftColor: '#a35d96',
    borderLeftWidth: 6,
    marginBottom: 10,
  },
  replyBody: {},
  replyUsername: {
    fontWeight: 'bold',
  },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function _ReplyingTo(props: { username: string; text: string }) {
  const { username, text } = props;

  return (
    <View style={styles.reply}>
      <View style={styles.replyBody}>
        <Text style={styles.replyUsername}>{username}</Text>
        <Text>{text}</Text>
      </View>
    </View>
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

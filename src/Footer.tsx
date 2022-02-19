import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';
import type { IFooterProps } from './types/Chatty.types';

function _Footer(props: IFooterProps) {
  const [message, setMessage] = useState<string>('');

  const onChangeText = useCallback(
    (text: string) => {
      setMessage(text);

      props.onChangeText(text);
    },
    [props]
  );

  const onPressSend = useCallback(() => {
    props.onPressSend(message);
    setMessage('');
  }, [message, props]);

  return (
    <View style={styles.container}>
      <TextInput
        value={message}
        onChangeText={onChangeText}
        style={styles.textInput}
        placeholder="Type a message..."
      />
      <Button title="Send" onPress={onPressSend} color="#0084ff" />
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
});

export const Footer = React.memo(_Footer);

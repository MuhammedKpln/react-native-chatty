import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { IChatHeaderProps } from './types/Chatty.types';

function _Header(props: IChatHeaderProps) {
  const { user } = props;

  return (
    <View
      style={{
        height: 60,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}
    >
      <Image source={user.avatar} style={styles.avatar} />
      <Text style={styles.username}>{user.username}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  username: {
    marginLeft: 10,
    textAlign: 'justify',
  },
});

export const Header = React.memo(_Header);

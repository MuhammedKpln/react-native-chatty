import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IChatHeaderProps } from './types/Chatty.types';

function _Header(props: IChatHeaderProps) {
  const { user } = props;
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Image source={user.avatar} style={styles.avatar} />
      <Text style={styles.username}>{user.username}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
    zIndex: 1,
  },
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

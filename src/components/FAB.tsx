import type { Ref } from 'react';
import React, { useImperativeHandle, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { IScrollToBottomProps } from 'src/types/Chatty.types';

export interface IFabRef {
  show: () => void;
  hide: () => void;
}

function _FAB(_: IScrollToBottomProps, ref: Ref<IFabRef>) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useImperativeHandle(
    ref,
    () => ({
      show: () => setIsVisible(true),
      hide: () => setIsVisible(false),
    }),
    []
  );

  if (!isVisible) return null;

  return (
    <TouchableOpacity
      style={_.containerStyle ?? styles.button}
      onPress={_.onPress}
    >
      {_.content ?? <Text style={styles.label}>DOWN</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    zIndex: 1,
    height: 50,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 50,
    position: 'absolute',
    bottom: 50,
    right: 20,
  },
  label: {
    textAlign: 'center',
    fontSize: 10,
  },
});

export const FAB = React.memo(React.forwardRef(_FAB));

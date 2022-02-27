import React, { useContext } from 'react';
import { useCallback } from 'react';
import { ActionSheetIOS, Platform, TouchableOpacity } from 'react-native';
import type { IMessage } from '../types/Chatty.types';
import { PropsContext } from '../Chatty';
import { contextMenuView } from '../utils/contextMenu';
import { ChatEmitter } from '../utils/eventEmitter';

interface IProps {
  message: IMessage;
  children: JSX.Element;
}

function ContextMenuWrapper(props: IProps) {
  const propsContext = useContext(PropsContext);

  const onPress = useCallback(
    (index) => {
      ChatEmitter.emit('actionPressed', index, props.message);
    },
    [props.message]
  );

  const onLongPress = useCallback(() => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            ...(propsContext.bubbleProps?.actions?.options.map(
              (_) => _.title
            ) as string[]),
            propsContext.bubbleProps?.actions?.cancelButtonLabel ?? 'Close',
          ],
          cancelButtonIndex: propsContext.bubbleProps?.actions?.options.length,
          destructiveButtonIndex:
            propsContext.bubbleProps?.actions?.options.findIndex(
              (_) => _.destructive
            ) || -1,
        },
        onPress
      );
    }
  }, [
    onPress,
    propsContext.bubbleProps?.actions?.cancelButtonLabel,
    propsContext.bubbleProps?.actions?.options,
  ]);

  // If actions are not defined, just return the children
  if (!propsContext.bubbleProps?.actions) return props.children;

  // If actions are defined, but ios version is not supported, return the actionsheet
  if (!contextMenuView) {
    return (
      <TouchableOpacity onLongPress={onLongPress}>
        {props.children}
      </TouchableOpacity>
    );
  }

  if (Platform.OS === 'ios' && Platform.Version >= 13) {
    return (
      <contextMenuView.default
        actions={propsContext.bubbleProps?.actions?.options}
        onPress={(e: any) => onPress(e.nativeEvent.index)}
      >
        {props.children}
      </contextMenuView.default>
    );
  }
  return (
    <contextMenuView.default
      actions={propsContext.bubbleProps?.actions?.options}
      onPress={(e: any) => onPress(e.nativeEvent.index)}
    >
      {props.children}
    </contextMenuView.default>
  );
}

export { ContextMenuWrapper };

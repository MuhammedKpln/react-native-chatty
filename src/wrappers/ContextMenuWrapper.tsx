import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { ActionSheetIOS, Platform, Text, View } from 'react-native';
import { PropsContext } from '../Chatty';
import type { IMessage } from '../types/Chatty.types';
import { contextMenuView } from '../utils/contextMenu';
import { ChatEmitter } from '../utils/eventEmitter';

interface IProps {
  message: IMessage;
  children: JSX.Element;
}

function ContextMenuWrapper(props: IProps) {
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
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

  const onChange = useCallback(() => {}, []);

  // If actions are not defined, just return the children
  if (!propsContext.bubbleProps?.actions) return props.children;

  if (Platform.OS === 'ios' && parseInt(Platform.Version, 10) >= 13) {
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
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={onChange}
    >
      <View>
        <Text>Awesome 🎉</Text>
      </View>
    </BottomSheet>
  );
}

export { ContextMenuWrapper };

import React, { useCallback, useRef } from 'react';
import { Text } from 'react-native';
import { ChatBubble } from './ChatBubble';
import type { ISwipeableBubble } from './types/Chatty.types';
import { loadGestureHandler } from './utils/gestureHandler';

const { Swipeable } = loadGestureHandler();

function _SwipeableBubble(props: ISwipeableBubble) {
  const { onReply, message } = props;
  const swipeableRef = useRef(null);

  const _onReply = useCallback(() => {
    if (!message) return;

    onReply!(message);
    //@ts-ignore
    swipeableRef.current?.close();
  }, [message, onReply, swipeableRef]);

  if (!message) return null;

  return (
    <Swipeable
      renderRightActions={() => <Text>Reply</Text>}
      friction={2}
      overshootFriction={2}
      onEnded={() => _onReply()}
      enableTrackpadTwoFingerGesture
      ref={swipeableRef}
    >
      <ChatBubble {...props} />
    </Swipeable>
  );
}

export const SwipeableBubble = React.memo(_SwipeableBubble);

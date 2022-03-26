import React, { Ref, useContext, useImperativeHandle, useState } from 'react';
import { Text } from 'react-native';
import type { ITypingStatusRef } from 'src/types/Chatty.types';
import { ChatBubble } from '../ChatBubble';
import { PropsContext } from '../Chatty';
import { loadLottie } from '../utils/lottie';

function _TypingStatus(_: any, ref: Ref<ITypingStatusRef>) {
  const [isTyping, setIsTyping] = useState(false);
  const propsContext = useContext(PropsContext);
  const LottieView = loadLottie();

  useImperativeHandle(
    ref,
    () => ({
      setIsTyping: (_isTyping: boolean) => {
        setIsTyping(_isTyping);
      },
    }),
    []
  );

  if (!isTyping) return null;

  if (LottieView) {
    if (propsContext?.renderTypingBubble) {
      return propsContext.renderTypingBubble({
        typingAnimation: (
          <LottieView
            source={require('../assets/lottie/typing.json')}
            autoPlay
            style={{ width: 30 }}
          />
        ),
      });
    }

    return (
      <ChatBubble>
        <LottieView
          source={require('../assets/lottie/typing.json')}
          autoPlay
          style={{ width: 30 }}
        />
      </ChatBubble>
    );
  } else {
    if (propsContext?.renderTypingBubble) {
      return propsContext.renderTypingBubble();
    }

    return <Text>Typing...</Text>;
  }
}

export const TypingStatus = React.memo(React.forwardRef(_TypingStatus));

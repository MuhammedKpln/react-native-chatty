import dayjs from 'dayjs';
import * as React from 'react';
import { useRef } from 'react';
import { View } from 'react-native';
import { Button, Image, Text } from 'react-native';
//@ts-ignore
import { Chatty, ChatEmitter } from 'react-native-chatty';
//@ts-ignore
import type { IMessage } from 'react-native-chatty/lib/typescript/src/types/Chatty.types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

export default function App() {
  const listRef = useRef(null);
  const message = useRef<string>('');
  const [replying, setReplying] = React.useState<IMessage | null>(null);
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      text: 'Hello',
      me: true,
      createdAt: new Date(),
      user: {
        id: 1,
        username: 'John Doe',
        avatar: { uri: 'https://i.pravatar.cc/300' },
      },
    },
    {
      id: 2,
      text: 'Hello22!!!',
      me: false,
      createdAt: new Date(),
      user: {
        id: 2,
        username: 'Jane Doe',
        avatar: { uri: 'https://i.pravatar.cc/300' },
      },
    },
    {
      id: 8,
      text: 'Hello!!!',
      me: false,
      createdAt: new Date(),
      user: {
        id: 2,
        username: 'Jane Doe',
        avatar: { uri: 'https://i.pravatar.cc/300' },
      },
    },
    {
      id: 7,
      text: 'Hello!!!',
      me: false,
      createdAt: new Date(),
      user: {
        id: 2,
        username: 'Jane Doe',
        avatar: { uri: 'https://i.pravatar.cc/300' },
      },
    },
    {
      id: 3,
      text: 'Hello!!!',
      me: false,
      createdAt: dayjs().add(2, 'day').toDate(),
      user: {
        id: 2,
        username: 'Jane Doe',
        avatar: { uri: 'https://i.pravatar.cc/300' },
      },
    },
    {
      id: 4,
      text: 'http://google.com Hello!!!',
      me: false,
      createdAt: dayjs().add(2, 'day').toDate(),
      user: {
        id: 2,
        username: 'Jane Doe',
        avatar: { uri: 'https://i.pravatar.cc/300' },
      },
    },
    {
      id: 5,
      text: '#hashtag Hello!!!',
      me: false,
      createdAt: dayjs().add(2, 'day').toDate(),
      user: {
        id: 2,
        username: 'Jane Doe',
        avatar: { uri: 'https://i.pravatar.cc/300' },
      },
    },
    {
      id: 6,
      text: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

      The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
      me: false,
      createdAt: dayjs().add(2, 'day').toDate(),
      user: {
        id: 2,
        username: 'Jane Doe',
        avatar: { uri: 'https://i.pravatar.cc/300' },
      },
      repliedTo: {
        id: 1,
        text: 'Hello',
        me: true,
        createdAt: new Date(),
        user: {
          id: 1,
          username: 'John Doe',
          avatar: { uri: 'https://i.pravatar.cc/300' },
        },
      },
    },
  ]);

  const onEndReached = () => {
    // if (e.nativeEvent.contentOffset.y === 0) {
    return new Promise((resolve) => {
      setMessages((prev) => [
        ...[
          {
            id: 1203,
            text: 'Ben yuklendim',
            me: true,
            createdAt: dayjs().add(-5, 'day').toDate(),
            user: {
              id: 1,
              username: 'John Doe',
              avatar: { uri: 'https://i.pravatar.cc/300' },
            },
          },
        ],
        ...prev,
      ]);

      setTimeout(() => {
        resolve(true);
      }, 300);
    });
    // }
  };

  React.useEffect(() => {
    ChatEmitter?.addListener('patternPressed', (pattern, message) => {
      console.warn('patern pressed', pattern, message);
    });

    return () => {
      ChatEmitter?.removeAllListeners();
    };
  }, []);

  const onPressSend = React.useCallback(
    ({ text, repliedTo }) => {
      //@ts-ignore
      listRef.current.appendMessage({
        id: messages.length + 1,
        text,
        me: Math.floor(Math.random() * 2) === 0,
        createdAt: new Date(),
        user: {
          id: messages.length + 1,
          name: 'John Doe',
          avatar: { uri: 'https://i.pravatar.cc/300' },
        },
        repliedTo,
      });
      //@ts-ignore

      listRef.current.setIsTyping(text.length > 0);
      setReplying(null);
    },
    [messages]
  );

  const onChangeText = React.useCallback((text) => {
    message.current = text;
    //@ts-ignore
    listRef.current.setIsTyping(text.length > 0);
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView>
        <Chatty
          enableHapticFeedback
          enablePatterns
          messages={messages}
          patternProps={{
            allowPatterns: ['url'],
          }}
          ref={listRef}
          //@ts-ignore
          closeReplyButton={(props) => (
            <Button
              title="ok"
              onPress={() => props?.onPressCancelReply() ?? null}
            />
          )}
          bubbleProps={{
            trailingAccessory: (
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={{
                  uri: 'https://i.imgur.com/BT8D542.png',
                }}
              />
            ),
            replyDragElement: (
              <Image
                source={{
                  uri: 'https://icon-library.com/images/reply-icon-png/reply-icon-png-16.jpg',
                }}
                style={{ width: 30, height: 30 }}
              />
            ),
          }}
          footerProps={{
            onPressSend: onPressSend,
            onChangeText: onChangeText,
            onPressCancelReply: () => setReplying(null),
          }}
          loadEarlierProps={{
            onLoadEarlier: onEndReached,
            show: messages.length === 10 ? false : true,
          }}
          onReply={(message) => {
            setReplying(message);
          }}
          replyingTo={replying ?? undefined}
          headerProps={{
            user: {
              id: 0,
              username: 'John Doe',
              avatar: { uri: 'https://i.pravatar.cc/300' },
            },
          }}
          renderTypingBubble={(props) => (
            <View>
              <Text>texting babocan</Text>
              {/* //@ts-ignore */}
              {props?.typingAnimation}
            </View>
          )}
        />
        <Button
          title="remove message"
          //@ts-ignore
          onPress={() => listRef?.current?.removeMessage(2)}
        />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

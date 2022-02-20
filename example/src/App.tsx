import dayjs from 'dayjs';
import * as React from 'react';
import { useRef } from 'react';
import { Button } from 'react-native';
//@ts-ignore
import { Chatty } from 'react-native-chatty';
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
  const [messages] = React.useState([
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
      id: 2,
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
      id: 2,
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
      id: 2,
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
      id: 2,
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
      id: 2,
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
      id: 2,
      text: 'Hello!!!',
      me: false,
      createdAt: dayjs().add(2, 'day').toDate(),
      user: {
        id: 2,
        username: 'Jane Doe',
        avatar: { uri: 'https://i.pravatar.cc/300' },
      },
      repliedTo: {
        id: 2,
        text: 'Hello!!qwleqweökqjwelkqjwelkqjwelkqwjekqlwljelkqwjelkq!',
        me: false,
        createdAt: dayjs().add(2, 'day').toDate(),
        user: {
          id: 2,
          username: 'Jane Doe',
          avatar: { uri: 'https://i.pravatar.cc/300' },
        },
      },
    },
  ]);

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

      listRef.current.setIsTyping(false);
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
          messages={messages}
          ref={listRef}
          closeReplyButton={(props) => (
            <Button
              title="ok"
              onPress={() => props?.onPressCancelReply() ?? null}
            />
          )}
          footerProps={{
            onPressSend: onPressSend,
            onChangeText: onChangeText,
            onPressCancelReply: () => setReplying(null),
            value: message.current,
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
        />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

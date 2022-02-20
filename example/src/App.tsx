import * as React from 'react';
import { useRef } from 'react';
import { Button } from 'react-native';
//@ts-ignore
import { Chatty } from 'react-native-chatty';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

export default function App() {
  const listRef = useRef(null);
  const message = useRef<string>('');
  const [replying, setReplying] = React.useState(null);
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
  ]);

  const onPressSend = React.useCallback(
    (message) => {
      //@ts-ignore
      listRef.current.appendMessage({
        id: messages.length + 1,
        text: message,
        me: Math.floor(Math.random() * 2) === 0,
        createdAt: new Date(),
        user: {
          id: messages.length + 1,
          name: 'John Doe',
          avatar: { uri: 'https://i.pravatar.cc/300' },
        },
      });
      //@ts-ignore

      listRef.current.setIsTyping(false);
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
          loadEarlierProps={{
            onLoadEarlier: () =>
              new Promise((resolve) => setTimeout(resolve, 1000)),
          }}
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
          }}
          onReply={() => {
            // setReplying(message);
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

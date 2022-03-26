# Load Earlier Messages

You'll need too pass loadEarlierProps, and it should be visible at the top of the messages.

:::tip Messages
You will have to arrange your messages your self, most probably on the backend.
:::

```
Props {
  show: boolean;
  onLoadEarlier: () => Promise<unknown>;
  buttonContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}
```



# Usage

```jsx
import React, { useState } from 'react';
import { Chatty } from 'react-native-chatty';

export default function MyReactPage() {
  const [messages, setMessages] = useState()
  const text = useRef()

  const onPressSend = (data) => {
    // Implement

    socket.send(data)
  }

  return (
    <Chatty
      messages={messages}
      headerProps={{
        id: 0,
        username: "Muhammed Kaplan",
        avatar: {
          uri: "https://blalala.com"
        }
      }}
      footerProps={{
        // To prevent any unnecessary re-rendering, we're using ref instead of states.
        onChangeText: (_text) => text.current = _text,
        onPressSend
      }}

      // Here is the prop you need to pass in order to get it working.
      loadEarlierProps={{
        show: true,
        onLoadEarlier => loadSomeMessages()
      }}
    />
  );
}
```

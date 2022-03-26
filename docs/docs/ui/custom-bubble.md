---
sidebar_position: 6
---
# Custom Bubble Component

Pass `renderBubble` prop a function that returns JSX.


:::warning
When using custom bubble component, some features like reply support will not work, instead customize provided bubble.
:::


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
      renderBubble={props => (
        <View>
          <Text> Custom Bubble! </Text>
        </View>
      )}
    />
  );
}
```

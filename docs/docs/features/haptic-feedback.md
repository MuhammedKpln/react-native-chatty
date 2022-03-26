# Haptic Feedback Support

Trigger haptic feedback when user receiv new message.


In order to get haptic feedback working, you'll need to install haptic feedback native modules.



## Install native dependencies
For Expo users: `npm i expo-haptics`

for bare RN users: `npm i react-native-haptic-feedback`


:::warning
Do not forget to run `pod install` after installations.
:::





## Usage

After installing the native dependencies, pass enableHapticFeedback prop.

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
      //Here
      enableHapticFeedback={true}
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
    />
  );
}
```

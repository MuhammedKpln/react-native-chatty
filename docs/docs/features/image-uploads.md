# (Experimental) Image Upload Support


![React native chatty](/img/imageUploader.gif)

## Install native dependencies
For Expo users: `npm i expo-image-picker`

for bare RN users: `npm i react-native-image-picker`


:::warning
Do not forget to run `pod install` after installations.
:::

## Usage




1. Firstly pass `enableImageUploads` prop to Chatty instance as you seem example below.
2. This will allow users to pick a media, when user sends a message Chatty will return image as base64 on your custom send function. See example below.


```jsx
import React, { useState } from 'react';
import { Chatty } from 'react-native-chatty';

export default function MyReactPage() {
  const [messages, setMessages] = useState()
  const text = useRef()

  const onPressSend = ({
      text,
      repliedTo,
      // Here are user selected images.
      media,
    }) => {

    // When user has pressed send button with selected image,
    // you will get images inside media as base64.

    // Afterwards you'll need to handle received image.


    socket.send(data)
  }

  return (
    <Chatty
      enableImageUploads
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





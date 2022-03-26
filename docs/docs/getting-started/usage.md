---
sidebar_position: 1
---
# Usage




:::tip
  For using your current chat backend, you need convert your entities either
  on client side or server side to Chatty message object.

  Here is the Chatty message object.

  ```
export interface IMessage {
  id: number;
  text: string;
  user: IUser;
  me: boolean;
  createdAt: Date;
  repliedTo?: IMessage;
  status?: MessageStatus;
  media?: IMedia[];
}
```
:::


```jsx
import React, { useState } from 'react';
import { Chatty } from 'react-native-chatty';

export default function MyReactPage() {
  const [messages, setMessages] = useState([
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
  ])
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
    />
  );
}
```


## What's next
Head over to *features* to enable additional support (like replying to a message)

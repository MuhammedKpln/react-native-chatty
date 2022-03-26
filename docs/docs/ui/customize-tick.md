# Customize message status (ticks)



## Usage

```jsx
import React, { useState } from 'react';
import { Chatty } from 'react-native-chatty';

export default function MyReactPage() {

  return (
    <Chatty
      {...props}
      bubbleProps={{
        tickProps: {
          // Pass your own elements here, defaults to emojis.
          sendingElement: <Text>Sending..</Text>,
          sentElement: <Text>Sent</Text>
          deliveredElement: <Text>Delivered</Text>
          readElement: <Text>Readed</Text>
        }
       }}
    />
  );
}
```


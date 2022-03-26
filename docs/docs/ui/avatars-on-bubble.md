# Show avatars beside chat bubble


## Usage

```jsx
import React, { useState } from 'react';
import { Chatty } from 'react-native-chatty';

export default function MyReactPage() {

  return (
    <Chatty
      {...props}
      bubbleProps={{
        // Here
        showAvatars: {
          width:50,
          heigth: 50,
          visible: true
        }
      }}
    />
  );
}
```


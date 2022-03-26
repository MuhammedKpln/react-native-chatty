# Add an trailing accessory

![Rn chatty](/img/trailing.jpeg)

## Usage

```jsx
import React, { useState } from 'react';
import { Chatty } from 'react-native-chatty';

export default function MyReactPage() {

  return (
    <Chatty
      {...props}
      bubbleProps={{
        trailingAccessory: <Icon name="heart" size={15} />
      }}
    />
  );
}
```




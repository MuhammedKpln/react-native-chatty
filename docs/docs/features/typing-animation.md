## Native dependencies

You will need to install `lottie-ios` and `lottie-react-native` in order to use default animation provided, otherwise it will fallback to text based typing animation.

:::tip
  Install native dependencies only if you are going to use default typing animation.
:::

renderTypingBubble={() => <Text>Custom View (Typing...)</Text>}

## Customize

Pass `renderTypingBubble` at Chatty instance.

```jsx
import React, { useState } from 'react';
import { Chatty } from 'react-native-chatty';

export default function MyReactPage() {

  return (
    <Chatty
      {...props}

      // If you want to render whole custom animation
      renderTypingBubble={() => <Text>Custom View (Typing...)</Text>}

      // Or if you want to use default animation but want's to change the container
      // You can grab default animation from the context, and use it that way too!.
      renderTypingBubble={({ typingAnimation }) => <View style={fancyStyles}>{typingAnimation}</View>}
    />
  );
}
```

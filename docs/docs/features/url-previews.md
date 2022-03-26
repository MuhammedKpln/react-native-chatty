# (Experimental) URL Preview Support

![](/img/urlPreview.jpeg)

When user sends a message that includes a valid url, it will fetch the meta data of the url that provided.

## Usage

```jsx
import React, { useState } from 'react';
import { Chatty } from 'react-native-chatty';

export default function MyReactPage() {

  return (
    <Chatty
      {...props}

      // Pass the prop, and that's it!
      enableUrlPreviews
    />
  );
}
```

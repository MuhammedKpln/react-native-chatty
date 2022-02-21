# react-native-chatty

💬 Full-featured high performance chat UI for React Native

[Check out Expo snack (For better results, try on real devices.)](https://snack.expo.dev/@muhammedkpln/react-native-chatty-example)

## Features
- Built with **TypeScript**
- 🚀 Using [recyclerlistview](https://github.com/Flipkart/recyclerlistview) for rendering messages
- Fully customizable components
- Loading earlier messages support
- Typing animation using **react-native-lottie** otherways use ur own animation
- Swipe to reply
- Scroll to bottom
- Haptic feedback on new message



## Installation

```sh
yarn add react-native-chatty
```
#### Optional Dependencies

- react-native-lottie
- react-native-haptic-feedback / expo-haptics



## Usage

```js
import { Chatty } from "react-native-chatty";


<Chatty messages={messages} headerProps={...} footerProps={...} />

// For more information visit

//https://github.com/MuhammedKpln/react-native-chatty/wiki

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

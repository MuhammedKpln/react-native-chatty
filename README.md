# react-native-chatty

💬 Full-featured high performance chat UI for React Native.


## Demo

With and without customizations:

caption1 | caption2
:-: | :-:
<img src="https://i.imgur.com/k7G9Yog.png" width="250" title="hover text"> | <video src="https://user-images.githubusercontent.com/17166855/156153084-f111fd20-f89e-41fd-b3bd-5b4e1be81b47.mp4"  width="250" />





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
- Hashtag, mention and url is parsed optionally, or even use ur **own** logic.
- **Actions** via [iOS context menu(fallback to actionsheet if not available)](https://developer.apple.com/design/human-interface-guidelines/ios/controls/context-menus/)
- Mention **directly from input** by typing @mention
- **Upload/View image** support.


## Installation

```sh
yarn add react-native-chatty
```
#### Optional Dependencies

- react-native-lottie
- react-native-haptic-feedback / expo-haptics
- react-native-parsed-text
- react-native-context-menu-view



## Usage


Head over to [Docs](https://muhammedkpln.github.io/react-native-chatty/) for more information.



```js
import { Chatty } from "react-native-chatty";


<Chatty messages={messages} headerProps={...} footerProps={...} />

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

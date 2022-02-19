import { View } from 'react-native';

export const loadAnimated = () => {
  try {
    const Animated = require('react-native-reanimated');

    return {
      View: Animated.default.View,
      ...Animated,
    };
  } catch (error) {
    console.warn(
      'React native reanimated is not installed, falling back to view.'
    );

    return {
      View,
    };
  }
};

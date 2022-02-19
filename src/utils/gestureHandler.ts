export function loadGestureHandler() {
  try {
    const gs = require('react-native-gesture-handler');

    return gs;
  } catch (error) {
    console.warn('React native gesture is not installed');
  }
}

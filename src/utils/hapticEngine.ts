import { Platform } from 'react-native';
import { HapticType } from '../types/Chatty.types';

let hapticEngine: any;

/* This is a function that returns a promise. It is used to trigger haptic feedback. */
let triggerHaptic: (type: HapticType) => Promise<void>;

try {
  if (Platform.OS === 'web') {
    throw new Error('Haptics are not supported on web');
  }

  hapticEngine = require('expo-haptics');

  // We're intitalizing the triggerHaptic function based on package they use.
  triggerHaptic = async (type: HapticType) => {
    switch (type) {
      case HapticType.Light:
        await hapticEngine.impactAsync(hapticEngine.ImpactFeedbackStyle.Light);
        break;
      case HapticType.Medium:
        await hapticEngine.impactAsync(hapticEngine.ImpactFeedbackStyle.Medium);
        break;
      case HapticType.Heavy:
        await hapticEngine.impactAsync(hapticEngine.ImpactFeedbackStyle.Heavy);
        break;

      default:
        break;
    }
  };
} catch {
  try {
    hapticEngine = require('react-native-haptic-feedback');
    triggerHaptic = async (type: HapticType) => {
      switch (type) {
        case HapticType.Light:
          hapticEngine.trigger('impactLight');
          break;
        case HapticType.Medium:
          hapticEngine.trigger('impactMedium');
          break;
        case HapticType.Heavy:
          hapticEngine.trigger('impactHeavy');
          break;

        default:
          break;
      }
    };
  } catch (error) {
    console.warn('Haptic engine not found');
  }
  console.warn('Haptic engine not found');
}

export { triggerHaptic, hapticEngine };

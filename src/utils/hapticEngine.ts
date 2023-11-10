import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import { HapticType } from '../types/Chatty.types';

/* This is a function that returns a promise. It is used to trigger haptic feedback. */
async function triggerHaptic(type: HapticType) {
  if (Platform.OS === 'web') {
    console.warn('Haptics are not supported on web');

    return;
  }

  try {
    switch (type) {
      case HapticType.Light:
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case HapticType.Medium:
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case HapticType.Heavy:
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;

      default:
        break;
    }
  } catch {
    throw new Error('expo-haptics not found');
  }
}

export { triggerHaptic };

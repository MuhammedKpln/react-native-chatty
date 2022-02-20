import { HapticType } from '../types/Chatty.types';

let hapticEngine: any;
let triggerHaptic: (type: HapticType) => Promise<void>;

try {
  hapticEngine = require('expo-haptics');
  console.log(hapticEngine);
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
    console.warn(
      'Haptic engine not found, please install react-native-haptic-feedback'
    );
  }
}

export { triggerHaptic };

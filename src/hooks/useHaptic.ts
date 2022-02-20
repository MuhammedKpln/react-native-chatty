import { useCallback } from 'react';
import type { HapticType } from '../types/Chatty.types';
import { triggerHaptic } from '../utils/hapticEngine';

export function useHaptic() {
  const trigger = useCallback(async (type: HapticType) => {
    await triggerHaptic(type).catch((err) =>
      console.error('Error while triggering haptic', err)
    );
  }, []);

  return { trigger };
}

import React, { useContext } from 'react';
import { Appearance, View } from 'react-native';
import { PropsContext } from '../Chatty';
let isLoaded: boolean = false;

try {
  require('moti');
  require('expo-linear-gradient');
  isLoaded = true;
} catch {
  console.warn(
    'Moti and expo-linear-gradient is not installed. Skeleton loader will not work.'
  );
}

/**
 * If the skeleton loader is enabled, then render the skeleton loader. Otherwise, render the children
 * @param {any} props - any
 * @returns A skeleton component / Native view object
 */
export function Skeleton(props: any) {
  const propsContext = useContext(PropsContext);

  if (propsContext?.enableSkeletonLoader && isLoaded) {
    try {
      const SS = require('moti/skeleton').Skeleton;

      return (
        <SS colorMode={Appearance.getColorScheme()} {...props}>
          {props.children}
        </SS>
      );
    } catch {
      console.warn(
        'Moti and expo-linear-gradient is not installed. Skeleton loader will not work.'
      );
    }
  }

  return <View>{props.children}</View>;
}

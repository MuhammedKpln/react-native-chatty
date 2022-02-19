import React from 'react';
import { loadAnimated } from '../utils/animated';

const { View } = loadAnimated();

export function AnimatedWrapper(props: any) {
  const { children } = props;

  return <View {...props}>{children}</View>;
}

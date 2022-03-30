import type { VideoProps } from 'expo-av';
import type { VideoProperties } from 'react-native-video';
import React from 'react';

export let videoRendererExpo: any;
export let videoRenderer: any;
try {
  videoRendererExpo = require('expo-av');
} catch {
  try {
    videoRenderer = require('react-native-video');
  } catch {
    console.warn(
      'expo-image-picker or react-native-image-picker not found. Please install it to use this feature.'
    );
  }
}

export function renderVideo(props: VideoProperties | VideoProps) {
  if (videoRenderer || videoRendererExpo) {
    if (videoRenderer) {
      return <videoRenderer.default {...props} />;
    }

    if (videoRendererExpo) {
      return <videoRendererExpo.Video {...props} />;
    }
  }

  return null;
}

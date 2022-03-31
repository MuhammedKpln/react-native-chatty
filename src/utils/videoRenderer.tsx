import type { Video, VideoProps } from 'expo-av';
import React from 'react';
import type { VideoProperties } from 'react-native-video';

export const videoRef = React.createRef<Video>();

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

export const RenderVideo = React.forwardRef((props: VideoProperties, _ref) => {
  if (videoRenderer) {
    return <videoRenderer.default {...props} ref={videoRef} />;
  }

  return null;
});

export const RenderVideoExpo = React.forwardRef((props: VideoProps, _ref) => {
  if (videoRenderer) {
    return <videoRendererExpo.Video {...props} ref={videoRef} />;
  }

  return null;
});

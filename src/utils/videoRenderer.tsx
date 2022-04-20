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
      'expo-av or react-native-video not found, video will not be rendered.'
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
  if (videoRendererExpo) {
    return <videoRendererExpo.Video {...props} ref={videoRef} />;
  }

  return null;
});

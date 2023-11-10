import { Video, VideoProps } from 'expo-av';
import React from 'react';

export const videoRef = React.createRef<Video>();

export const RenderVideoExpo = React.forwardRef((props: VideoProps, _ref) => {
  return <Video {...props} ref={videoRef} />;
});

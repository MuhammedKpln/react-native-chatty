import React from 'react';
import type { IMedia } from '../types/Chatty.types';
import {
  RenderVideo,
  RenderVideoExpo,
  videoRef,
  videoRendererExpo,
} from '../utils/videoRenderer';

interface IProps {
  media: IMedia;
}

export const Video = ({ media }: IProps) => {
  if (videoRendererExpo) {
    return (
      <RenderVideoExpo
        source={{ uri: media.uri, ...media?.videoOptions?.headers }}
        style={{
          width: 300,
          height: 300,
        }}
        pictureInPicture={media?.videoOptions?.pictureInPicture}
        resizeMode="contain"
        useNativeControls
        shouldPlay
        ref={videoRef}
        {...media?.videoOptions}
      />
    );
  }

  return (
    <RenderVideo
      source={{ uri: media.uri, ...media?.videoOptions?.headers }}
      style={{
        width: 300,
        height: 300,
      }}
      pictureInPicture={media?.videoOptions?.pictureInPicture}
      resizeMode="contain"
      paused={false}
      ref={videoRef}
      {...media?.videoOptions}
    />
  );
};

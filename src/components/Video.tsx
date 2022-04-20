import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import type { IMedia } from '../types/Chatty.types';
import {
  RenderVideo,
  RenderVideoExpo,
  videoRef,
  videoRenderer,
  videoRendererExpo,
} from '../utils/videoRenderer';

interface IProps {
  media: IMedia;
}

export const _Video = ({ media }: IProps) => {
  useEffect(() => {
    return () => {
      console.log('Video unmount');
    };
  });

  if (videoRendererExpo) {
    return (
      <RenderVideoExpo
        source={{ uri: media.uri, ...media?.videoOptions?.headers }}
        style={{
          width: 300,
          height: 300,
        }}
        pictureInPicture={true}
        resizeMode="contain"
        onError={(e) => console.log(e)}
        useNativeControls
        shouldPlay
        ref={videoRef}
        {...media?.videoOptions}
      />
    );
  } else if (videoRenderer) {
    return (
      <RenderVideo
        source={{ uri: media.uri, ...media?.videoOptions?.headers }}
        style={{
          width: 300,
          height: 300,
        }}
        pictureInPicture={media?.videoOptions?.pictureInPicture}
        resizeMode="contain"
        controls={true}
        ref={videoRef}
        {...media?.videoOptions}
      />
    );
  }

  return <Text style={styles.missingText}>Missing ExpoAv/RNVideo</Text>;
};

const styles = StyleSheet.create({
  missingText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export const Video = React.memo(_Video);

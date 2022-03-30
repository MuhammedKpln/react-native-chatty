import type { VideoProps } from 'expo-av';
import { useEffect, useMemo } from 'react';
import { InteractionManager } from 'react-native';
import type { VideoProperties } from 'react-native-video';
import type { IMedia } from '../types/Chatty.types';
import { renderVideo, videoRendererExpo } from '../utils/videoRenderer';

interface IProps {
  media: IMedia;
}

export const Video = ({ media }: IProps) => {
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {});
  }, []);

  const _renderVideo = useMemo(() => {
    //FIXME: Use a thumbnail to work around the issue of poster is overlaying the video.
    if (videoRendererExpo) {
      return renderVideo({
        source: { uri: media.uri, ...media?.videoOptions?.headers },
        style: {
          width: 300,
          height: 300,
        },
        fullscreen: true,
        pictureInPicture: media?.videoOptions?.pictureInPicture,
        resizeMode: 'cover',
        useNativeControls: true,
        // FIXME: Poster does not work with native controls
        posterSource: { uri: media?.videoOptions?.thumbnail },
        usePoster: media?.videoOptions?.thumbnail !== undefined,
        ...media?.videoOptions,
        posterStyle: { resizeMode: 'cover' },
      } as VideoProps);
    }

    return renderVideo({
      source: { uri: media.uri, ...media?.videoOptions?.headers },
      style: {
        width: 300,
        height: 300,
      },
      fullscreen: true,
      pictureInPicture: media?.videoOptions?.pictureInPicture,
      resizeMode: 'contain',
      poster: media?.videoOptions?.thumbnail,
      ...media?.videoOptions,
    } as VideoProperties);
  }, [media.uri, media?.videoOptions]);

  return _renderVideo;
};

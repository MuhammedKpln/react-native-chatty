import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  InteractionManager,
  StyleSheet,
  View,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import type { IMedia } from '../types/Chatty.types';
import { Video } from './Video';

interface IProps {
  media: IMedia;
  isSelected?: boolean;
}

function _VideoThumbnail({ media, isSelected }: IProps) {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [showThumbnail, setShowThumbnail] = useState(false);
  const playIcon = useMemo(() => require('../assets/icons/play.png'), []);

  useEffect(() => {
    return () => {
      console.log('VideoThumbnail unmount');
    };
  }, []);

  const onPressThumbnail = useCallback(() => {
    setShowVideo(true);
  }, []);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (media?.videoOptions?.thumbnail) {
        Image.prefetch(media?.videoOptions?.thumbnail).then(() => {
          setShowThumbnail(true);
        });
      } else {
        setShowThumbnail(true);
      }
    });
  }, [media?.videoOptions?.thumbnail]);

  if (showVideo) {
    return <Video media={media} />;
  }

  if (!showThumbnail) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={isSelected ? onPressThumbnail : () => null}
    >
      <ImageBackground
        source={{
          uri: media?.videoOptions?.thumbnail,
        }}
        style={!isSelected ? styles.container : styles.isSelecetedContainer}
        imageStyle={styles.contentContainer}
      >
        <View style={styles.overlay} />
        <Image
          source={playIcon}
          style={!isSelected ? styles.image : styles.isSelectedImage}
        />
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 100,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  isSelecetedContainer: {
    width: 300,
    height: 300,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  contentContainer: {
    borderRadius: 15,
  },
  image: {
    width: 25,
    height: 25,
  },
  isSelectedImage: {
    width: 50,
    height: 50,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export const VideoThumbnail = React.memo(_VideoThumbnail);

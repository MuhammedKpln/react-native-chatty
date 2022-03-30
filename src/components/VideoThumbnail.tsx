import React, { useMemo } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import type { IMedia } from '../types/Chatty.types';

interface IProps {
  media: IMedia;
}

export function VideoThumbnail({ media }: IProps) {
  const playIcon = useMemo(() => require('../assets/icons/play.png'), []);

  return (
    <ImageBackground
      source={{
        uri: media?.videoOptions?.thumbnail,
      }}
      style={styles.container}
      imageStyle={styles.contentContainer}
    >
      <View style={styles.overlay} />
      <Image source={playIcon} style={styles.image} />
    </ImageBackground>
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
  contentContainer: {
    borderRadius: 15,
  },
  image: {
    width: 25,
    height: 25,
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
});

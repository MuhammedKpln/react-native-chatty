import React, { useCallback } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { IUrlPreviewBubble } from 'src/types/Chatty.types';

export const UrlPreviewBubble = (props: IUrlPreviewBubble) => {
  const { url, title, description, image } = props;

  const onPressLink = useCallback(async () => {
    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      Linking.openURL(url);
    }
  }, [url]);

  return (
    <TouchableOpacity onPress={onPressLink}>
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.previewImage} />

        <View style={styles.subContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description.slice(0, 50)}...</Text>
          <Text style={styles.url}>{url}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    maxHeight: 100,
    overflow: 'hidden',
  },
  subContainer: {
    marginLeft: 10,
  },
  previewImage: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: '#888',
  },
  url: {
    marginTop: 40,
    color: '#3C91E6',
  },
});

let PhotoView: any;

try {
  PhotoView = require('react-native-image-viewing').default;
} catch {
  console.warn(
    'react-native-image-viewing not found. Image browser/zoom will not work.'
  );
}

export { PhotoView };

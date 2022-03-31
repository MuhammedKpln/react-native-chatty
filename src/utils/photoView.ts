let PhotoView: any;

try {
  PhotoView = require('@muhammedkpln/react-native-image-viewing').default;
} catch {
  console.warn(
    '@muhammedkpln/react-native-image-viewing not found. Image browser/zoom will not work.'
  );
}

export { PhotoView };

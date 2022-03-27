let imagePicker: any;

try {
  imagePicker = require('expo-image-picker');
} catch {
  try {
    imagePicker = require('react-native-image-picker');
  } catch {
    console.warn(
      'expo-image-picker or react-native-image-picker not found. Please install it to use this feature.'
    );
  }
}

/**
 * It launches the native image picker
 * @returns The image data is being returned as a base64 string.
 */
export async function selectImage() {
  if (imagePicker?.launchImageLibraryAsync) {
    return await imagePicker.launchImageLibraryAsync({
      base64: true,
    });
  }

  return await imagePicker.launchImageLibrary({
    includeBase64: true,
  });
}

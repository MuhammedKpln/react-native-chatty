let imagePicker: any;
let isExpo: boolean = false;

try {
  imagePicker = require('expo-image-picker');
  isExpo = true;
} catch {
  try {
    imagePicker = require('react-native-image-picker');
  } catch {
    console.warn(
      'expo-image-picker or react-native-image-picker not found. Please install it to use this feature.'
    );
  }
}

export async function selectImage() {
  if (isExpo) {
    return await imagePicker.launchImageLibraryAsync({
      base64: true,
    });
  }

  return await imagePicker.launchImageLibrary({
    includeBase64: true,
  });
}

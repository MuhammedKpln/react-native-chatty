import * as ImagePicker from 'expo-image-picker';

/**
 * It launches the native image picker
 */
export async function selectImage(): Promise<ImagePicker.ImagePickerResult> {
  try {
    return await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });
  } catch {
    throw new Error('expo-image-picker is not installed');
  }
}

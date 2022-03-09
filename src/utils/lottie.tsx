export const loadLottie = () => {
  try {
    const LottieView = require('lottie-react-native');

    return LottieView;
  } catch (error) {
    console.warn(
      'Lottie is not installed, falling back to text-based typing effect.'
    );
  }
};

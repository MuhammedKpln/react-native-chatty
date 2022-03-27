import type { IPatternShape } from 'src/types/Chatty.types';

export function loadParsedText() {
  try {
    const ReactNativeParsedText = require('react-native-parsed-text').default;

    return ReactNativeParsedText;
  } catch (err) {
    console.warn(
      "Couldn't load react-native-parsed-text, please install it if you want to use the pattern feature"
    );
  }
}

export const HASHTAG_PATTERN_SHAPE: IPatternShape = {
  pattern: /#(\w+)/,
  style: {
    color: 'cyan',
  },
};
export const MENTION_PATTERN_SHAPE: IPatternShape = {
  pattern: /\B@\w+/g,
  style: {
    color: 'orange',
  },
};
export const URL_PATTERN_SHAPE: IPatternShape = {
  type: 'url',
  style: {
    color: 'blue',
  },
};

export const ALL_PATERNS_SHAPES = [
  HASHTAG_PATTERN_SHAPE,
  MENTION_PATTERN_SHAPE,
  URL_PATTERN_SHAPE,
];

/**
 * Load all the patterns and set the onPress function
 * @param onPress - (pattern: string, index: number) => void
 */
export function LoadAllPaternShapes(
  onPress: (pattern: string, index: number) => void
) {
  ALL_PATERNS_SHAPES.map((pattern) => {
    if (pattern?.onPress) return;

    pattern.onPress = onPress;
    Object.freeze(pattern);
  });
}

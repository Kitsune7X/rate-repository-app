// @ts-check
import { Platform } from 'react-native';
// Using JSDoc type annotations since as const is not usable
// https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    lightWhite: '#fff',
    primary: '#0366d6',
    background: '#24292e',
    lightGray: '#e1e4e8',
    midGray: '#acacac',
    error: '#d73a4a',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 20,
    rating: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: /** @type {const} */ ({
    normal: '400',
    bold: '700',
  }),
};

export default theme;

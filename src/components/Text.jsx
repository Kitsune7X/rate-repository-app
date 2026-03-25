// @ts-check
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorSubHeading: {
    color: theme.colors.lightWhite,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorError: {
    color: theme.colors.error,
  },
  fontSizeHeading: {
    fontSize: theme.fontSizes.heading,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontSizeRating: {
    fontSize: theme.fontSizes.rating,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

// Define special type with JSDoc
/**
 * @typedef {Object} TextComponentProps
 * @property {'textSecondary' | 'primary' | 'subheading' | 'error'} [color]
 * @property {'heading' | 'subheading'| 'rating'} [fontSize]
 * @property {'bold'} [fontWeight]
 * @property {any} [style]
 * @property {string |  number | (string | number)[]} children
 */

// Assign the defined special type to props
/**
 *
 * @param {TextComponentProps} props
 * @returns
 */

const Text = ({ color, fontSize, fontWeight, style, children, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'subheading' && styles.colorSubHeading,
    color === 'error' && styles.colorError,
    fontSize === 'heading' && styles.fontSizeHeading,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'rating' && styles.fontSizeRating,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return (
    <NativeText style={textStyle} {...props}>
      {children}
    </NativeText>
  );
};

export default Text;

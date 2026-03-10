// @ts-check

// Using JSDoc type annotations since as const is not usable
// https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
const theme = {
	colors: {
		textPrimary: '#24292e',
		textSecondary: '#586069',
		subHeading: '#e7e7e7',
		primary: '#0366d6',
		background: '#24292e',
	},
	fontSizes: {
		body: 14,
		subheading: 16,
		heading: 20,
	},
	fonts: {
		main: 'System',
	},
	fontWeights: /** @type {const} */ ({
		normal: '400',
		bold: '700',
	}),
};

export default theme;

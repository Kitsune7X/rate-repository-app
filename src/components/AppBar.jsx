import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.background,
		height: 70,
		justifyContent: 'center',
		paddingHorizontal: 20,
	},
});

const AppBar = () => {
	return (
		<View style={styles.container}>
			<Text color="subheading" fontSize="subheading" fontWeight="bold">
				Repositories
			</Text>
		</View>
	);
};

export default AppBar;

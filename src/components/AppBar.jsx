// @ts-check
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.background,
		height: 70,
		paddingHorizontal: 20,
	},
	scrollViewContentContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 20,
	},
});

const AppBar = () => {
	return (
		<View style={styles.container}>
			<ScrollView horizontal contentContainerStyle={styles.scrollViewContentContainer}>
				<Link to="/">
					<Text color="subheading" fontSize="subheading" fontWeight="bold">
						Repositories
					</Text>
				</Link>
				<Link to="/signin">
					<Text color="subheading">Signin</Text>
				</Link>
			</ScrollView>
		</View>
	);
};

export default AppBar;

// TODO: Style the link

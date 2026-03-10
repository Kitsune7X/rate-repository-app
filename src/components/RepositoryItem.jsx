// @ts-check
import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingHorizontal: 10,
	},
	avatar: {
		height: 50,
		width: 50,
		borderRadius: 4,
	},
	header: {
		flexDirection: 'row',
		gap: 10,
	},
	summary: {
		alignItems: 'flex-start',
	},
	language: {
		paddingHorizontal: 6,
		paddingVertical: 5,
		backgroundColor: theme.colors.primary,
		borderRadius: 4,
	},
});

/**
 * @typedef {Object} Repository
 * @property {string} fullName
 * @property {string} description
 * @property {string} language
 * @property {number} forksCount
 * @property {number} stargazersCount
 * @property {number} ratingAverage
 * @property {number} reviewCount
 * @property {string} ownerAvatarUrl
 */

/**
 * @typedef {Object} RepositoryItemProps
 * @property {Repository} repository
 */

/**
 * @param {RepositoryItemProps}  repository
 */
const RepositoryItem = ({ repository }) => {
	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />
				<View style={styles.summary}>
					<Text fontSize="subheading" fontWeight="bold">
						{repository.fullName}
					</Text>
					<Text color="textSecondary">{repository.description}</Text>
					<View style={styles.language}>
						<Text color="subheading">{repository.language}</Text>
					</View>
				</View>
			</View>

			{/* Repository Details */}
			<Text>Forks: {repository.forksCount}</Text>
			<Text>Stars: {repository.stargazersCount}</Text>
			<Text>Review: {repository.reviewCount}</Text>
			<Text>Rating: {repository.ratingAverage}</Text>
		</View>
	);
};

export default RepositoryItem;

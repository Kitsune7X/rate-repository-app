// @ts-check
import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
	container: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		backgroundColor: theme.colors.lightWhite,
	},
	avatar: {
		height: 60,
		width: 60,
		borderRadius: 4,
	},
	header: {
		flexDirection: 'row',
		gap: 10,
		marginBottom: 10,
	},
	summary: {
		alignItems: 'flex-start',
		gap: 7,
	},
	language: {
		paddingHorizontal: 6,
		paddingVertical: 5,
		backgroundColor: theme.colors.primary,
		borderRadius: 4,
	},
	statisticContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
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
			<View style={styles.statisticContainer}>
				<Statistic stat={repository.stargazersCount} description="Stars" />
				<Statistic stat={repository.forksCount} description="Forks" />
				<Statistic stat={repository.reviewCount} description="Reviews" />
				<Statistic stat={repository.ratingAverage} description="Rating" />
			</View>
		</View>
	);
};

export default RepositoryItem;

/**
 * @typedef {Object} Statistic
 * @property {number} stat
 * @property {string} description
 */

/**
 *
 * @param {Statistic} props
 * @returns
 */
const Statistic = ({ stat, description }) => {
	const styles = StyleSheet.create({
		container: {
			alignItems: 'center',
		},
	});

	const parseStat = () => {
		return stat >= 1000 ? Math.round((stat / 1000) * 10) / 10 + 'k' : stat;
	};

	return (
		<View style={styles.container}>
			<Text fontWeight="bold">{parseStat()}</Text>
			<Text>{description}</Text>
		</View>
	);
};

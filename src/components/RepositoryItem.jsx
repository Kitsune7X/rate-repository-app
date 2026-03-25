// @ts-check
import { Button, FlatList, Image, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useParams, useNavigate } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import * as Linking from 'expo-linking';
import { format } from 'date-fns';
import useDeleteReview from '../hooks/useDeleteReview';

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
  openLinkButton: {
    marginTop: 10,
  },
  reviewItem: {
    backgroundColor: theme.colors.lightWhite,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    gap: 15,
  },
  reviewItemRating: {
    borderStyle: 'solid',
    borderWidth: 4,
    borderColor: theme.colors.primary,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  reviewItemDescription: {
    flex: 1,
    gap: 4,
  },
  interactiveButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
});

// Single review item
export const ReviewItem = ({ review }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  return (
    <View style={styles.reviewItem}>
      {/* Rating */}
      <View style={styles.reviewItemRating}>
        <Text fontSize="rating" color="primary" fontWeight="bold">
          {review.rating}
        </Text>
      </View>

      {/* Description */}
      <View style={styles.reviewItemDescription}>
        <Text fontSize="subheading" fontWeight="bold">
          {review?.user?.username ?? review?.repository?.fullName}
        </Text>
        <Text color="textSecondary">{format(review.createdAt, 'd.M.y')}</Text>
        <Text>{review.text}</Text>

        {/* Interactive Buttons */}
        {review?.repository?.fullName && (
          <View style={styles.interactiveButtons}>
            <Button
              title="View repository"
              onPress={() => navigate(`/${review.repository.id}`)}
            />
            <Button
              color={theme.colors.error}
              title="Delete Review"
              onPress={() =>
                deleteReview({
                  deleteReviewId: review.id,
                })
              }
            />
          </View>
        )}
      </View>
    </View>
  );
};

// Wrapper component for RepositoryItem to use when viewing single repository
export const SingleRepository = () => {
  const { repositoryId } = useParams();

  if (!repositoryId) return null;

  const { repository, loading, fetchMore } = useRepository({
    repositoryId,
    first: 8,
  });

  const onEndReach = () => {
    fetchMore();
  };

  if (loading) return <div>Loading...</div>;

  const reviews = repository?.reviews?.edges.map((item) => item.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

// This is the header
const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: repository.ownerAvatarUrl }}
          style={styles.avatar}
        />
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

      {/*  Open in GitHub button */}
      {repository.url && (
        <View style={styles.openLinkButton}>
          <Button
            title="Open in GitHub"
            onPress={() => Linking.openURL(repository.url)}
          />
        </View>
      )}
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

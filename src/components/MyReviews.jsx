import Text from './Text';
import { ReviewItem } from './RepositoryItem';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { FlatList } from 'react-native';
import { ItemSeparator } from './RepositoryList';

const MyReviews = () => {
  const { data, loading } = useCurrentUser({ includeReviews: true });

  if (loading) return <Text>Loading...</Text>;

  const reviews = data?.me?.reviews?.edges.map((r) => r.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;

import Text from './Text';
import RepositoryItem, { ReviewItem } from './RepositoryItem';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { FlatList } from 'react-native';
import { ItemSeparator } from './RepositoryList';

const MyReviews = () => {
  const { data, loading } = useCurrentUser({ includeReviews: true });
  console.log(data);

  if (loading) return <Text>Loading...</Text>;

  const reviews = data?.me?.reviews?.edges.map((r) => r.node);

  console.log(reviews);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;

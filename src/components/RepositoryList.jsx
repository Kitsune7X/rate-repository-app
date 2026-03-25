// @ts-check
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import { useDebounce } from 'use-debounce';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  orderPicker: {
    height: 50,
    paddingHorizontal: 10,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

// Picker
const OrderPicker = ({
  selectedOrder,
  setSelectedOrder,
  getSortedRepositories,
}) => {
  return (
    <Picker
      style={styles.orderPicker}
      selectedValue={selectedOrder}
      onValueChange={(itemValue) => {
        // console.log(itemValue);
        setSelectedOrder(itemValue);

        const filter =
          itemValue === 'latest'
            ? { orderBy: 'CREATED_AT', orderDirection: 'DESC' }
            : itemValue === 'highest-rated'
              ? { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' }
              : itemValue === 'lowest-rated'
                ? { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }
                : null;

        getSortedRepositories(filter?.orderBy, filter?.orderDirection);
      }}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest-rated" />
      <Picker.Item label="Lowest rated repositories" value="lowest-rated" />
    </Picker>
  );
};

// Search bar
const SearchComponent = ({ searchValue, setSearchValue }) => {
  return <Searchbar value={searchValue} onChangeText={setSearchValue} />;
};

// Experimenting with non destructuring props for cleaner component?
const RepositoryListHeader = (props) => (
  <View>
    <OrderPicker
      selectedOrder={props.selectedOrder}
      setSelectedOrder={props.setSelectedOrder}
      getSortedRepositories={props.getSortedRepositories}
    />
    <SearchComponent
      searchValue={props.searchValue}
      setSearchValue={props.setSearchValue}
    />
  </View>
);

export const RepositoryListContainer = ({
  repositories,
  selectedOrder = '',
  setSelectedOrder,
  getSortedRepositories,
  searchValue = '',
  setSearchValue,
}) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <RepositoryListHeader
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          getSortedRepositories={getSortedRepositories}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            navigate({
              pathname: `/${item.id}`,
            });
          }}
        >
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('');
  const [sortedRepositories, setSortedRepositories] = useState();
  const [searchValue, setSearchValue] = useState('');

  // Use debounce to avoid unnecessary requests while the user types the
  // keyword fast
  const [searchKeyword] = useDebounce(searchValue, 500);

  // Pass the debounced value to the query
  const { repositories, loading, getRepositories } = useRepositories({
    searchKeyword,
  });

  if (loading) return null;

  const getSortedRepositories = async (orderBy, orderDirection) => {
    await getRepositories({
      variables: {
        orderBy,
        orderDirection,
      },
      onCompleted: (data) => {
        setSortedRepositories(data?.repositories);
      },
    });
  };

  return (
    <RepositoryListContainer
      repositories={sortedRepositories ?? repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      getSortedRepositories={getSortedRepositories}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
    />
  );
};

export default RepositoryList;

// TODO: Use Debounce
// FIXME: Fix search bar losing focus

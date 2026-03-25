// @ts-check
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ searchKeyword = '' } = {}) => {
  const { loading, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      searchKeyword,
    },
  });

  const [getRepositories] = useLazyQuery(GET_REPOSITORIES);

  return {
    repositories: data?.repositories,
    loading,
    getRepositories,
  };
};

export default useRepositories;

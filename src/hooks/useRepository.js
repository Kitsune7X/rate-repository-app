import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (repositoryId) => {
  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: {
      repositoryId,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    loading,
    repository: data?.repository,
  };
};

export default useRepository;

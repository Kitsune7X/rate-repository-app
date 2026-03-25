import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

export const useCurrentUser = ({ includeReviews = false } = {}) =>
  useQuery(GET_CURRENT_USER, {
    variables: {
      includeReviews,
    },
    fetchPolicy: 'cache-and-network',
  });

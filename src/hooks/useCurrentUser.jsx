import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

export function useCurrentUser() {
  return useQuery(GET_CURRENT_USER);
}

// TODO: use $includeReviews to query conditionally

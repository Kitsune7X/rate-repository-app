import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutation';
import { GET_CURRENT_USER } from '../graphql/queries';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    refetchQueries: [
      {
        query: GET_CURRENT_USER,
        variables: { includeReviews: true },
      },
    ],
  });

  const deleteReview = async ({ deleteReviewId }) => {
    return await mutate({
      variables: {
        deleteReviewId,
      },
    });
  };

  return [deleteReview, result];
};

export default useDeleteReview;

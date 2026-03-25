import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutation';
import { useNavigate } from 'react-router-native';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const createReview = async ({
    repositoryName,
    ownerName,
    rating,
    text = '',
  }) => {
    return await mutate({
      variables: {
        review: {
          repositoryName,
          ownerName,
          rating,
          text,
        },
      },
      onCompleted: (data) => {
        navigate(`/${data?.createReview?.repositoryId}`);
      },
    });
  };

  return [createReview, result];
};

export default useCreateReview;

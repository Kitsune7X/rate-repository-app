import { CREATE_USER } from '../graphql/mutation';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import useSignin from './useSignIn';

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  const [signIn] = useSignin();

  const createUser = async ({ username, password }) => {
    return await mutate({
      variables: {
        user: {
          username,
          password,
        },
      },
      onCompleted: async () => {
        await signIn({ username, password });
        navigate('/');
      },
    });
  };

  return [createUser, result];
};

export default useCreateUser;

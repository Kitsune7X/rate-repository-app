import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutation';
import useAuthStorage from './useAuthStorage';
import { useNavigate } from 'react-router-native';

const useSignin = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    return await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
      onCompleted: async (data) => {
        await authStorage.setAccessToken(data.authenticate.accessToken);
        await apolloClient.resetStore();
        navigate('/');
      },
    });
  };

  return [signIn, result];
};

export default useSignin;

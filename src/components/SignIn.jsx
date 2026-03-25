// @ts-check
import { Formik } from 'formik';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import Text from './Text';
import useSignin from '../hooks/useSignIn';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'Username too short')
    .max(50, 'Username too long')
    .required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password too short')
    .required('Password is required'),
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
    backgroundColor: theme.colors.lightWhite,
  },
  input: {
    borderColor: theme.colors.midGray,
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderRadius: 5,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  button: {
    paddingVertical: 15,
  },
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <TextInput
            style={[
              styles.input,
              errors.username && touched.username ? styles.inputError : null,
            ]}
            onChangeText={handleChange('username')}
            value={values.username}
            placeholder="Username"
            placeholderTextColor={theme.colors.midGray}
            onBlur={handleBlur('username')}
          />
          {/* Error validation */}
          {errors.username && touched.username && (
            <Text color="error">{errors.username}</Text>
          )}

          <TextInput
            style={[
              styles.input,
              errors.password && touched.password ? styles.inputError : null,
            ]}
            onChangeText={handleChange('password')}
            value={values.password}
            placeholder="Password"
            placeholderTextColor={theme.colors.midGray}
            onBlur={handleBlur('password')}
            secureTextEntry={true}
          />

          {errors.password && touched.password && (
            <Text color="error">{errors.password}</Text>
          )}
          <Button onPress={() => handleSubmit()} title="Sign in" />
        </View>
      )}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignin();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;

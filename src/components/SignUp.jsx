// @ts-check
import { Formik } from 'formik';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import Text from './Text';
import useCreateUser from '../hooks/useCreateUser';

const newUserSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username too short')
    .max(30, 'Username too long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password too short')
    .max(50, 'Password too long')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Password does not match')
    .required(),
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

const SignUp = () => {
  const [createUser] = useCreateUser();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await createUser({
        username,
        password,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        passwordConfirmation: '',
      }}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={newUserSchema}
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

          <TextInput
            style={[
              styles.input,
              errors.passwordConfirmation && touched.passwordConfirmation
                ? styles.inputError
                : null,
            ]}
            onChangeText={handleChange('passwordConfirmation')}
            value={values.passwordConfirmation}
            placeholder="Repeat the password"
            placeholderTextColor={theme.colors.midGray}
            onBlur={handleBlur('passwordConfirmation')}
            secureTextEntry={true}
          />

          {errors.passwordConfirmation && touched.passwordConfirmation && (
            <Text color="error">{errors.passwordConfirmation}</Text>
          )}
          <Button onPress={() => handleSubmit()} title="Sign up" />
        </View>
      )}
    </Formik>
  );
};

export default SignUp;

// @ts-check
import { View, TextInput, Button } from 'react-native';
import Text from './Text';
import { Formik } from 'formik';

const SignIn = () => {
	return (
		<Formik
			initialValues={{
				username: '',
				password: '',
			}}
			onSubmit={(values) => console.log(values)}
		>
			{({ handleChange, handleSubmit, values }) => (
				<View>
					<TextInput onChangeText={handleChange('username')} value={values.username} placeholder="Username" />
					<TextInput onChangeText={handleChange('password')} value={values.password} placeholder="Password" />
					<Button onPress={() => handleSubmit()} title="Submit" />
				</View>
			)}
		</Formik>
	);
};

export default SignIn;

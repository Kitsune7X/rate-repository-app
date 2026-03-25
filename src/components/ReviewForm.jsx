import { Formik } from 'formik';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import Text from './Text';
import useCreateReview from '../hooks/useCreateReview';

const ReviewForm = () => {
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { repositoryOwnerName, repositoryName, rating, review } = values;

    try {
      const { data } = await createReview({
        repositoryName,
        ownerName: repositoryOwnerName,
        rating: +rating,
        text: review,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const reviewSchema = yup.object().shape({
    repositoryOwnerName: yup
      .string()
      .min(2, 'Minimum length is 2')
      .required('Repository owner name is required'),
    repositoryName: yup
      .string()
      .min(2, 'Minimum length is 2')
      .required('Repository name is required'),
    rating: yup
      .number()
      .min(0, 'Rating need to be equal or larger than 0')
      .integer()
      .max(100, 'Rating need to be less than or equal 100'),
    review: yup.string().nullable(),
  });

  // Form styles
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
      placeholder: theme.colors.midGray,
    },
    inputError: {
      borderColor: theme.colors.error,
    },
    button: {
      paddingVertical: 15,
    },
  });

  return (
    <Formik
      initialValues={{
        repositoryOwnerName: '',
        repositoryName: '',
        rating: '',
        review: '',
      }}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={reviewSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <TextInput
            style={[
              styles.input,
              errors.repositoryOwnerName && touched.repositoryOwnerName
                ? styles.inputError
                : null,
            ]}
            onChangeText={handleChange('repositoryOwnerName')}
            onBlur={handleBlur('repositoryOwnerName')}
            value={values.repositoryOwnerName}
            placeholder="Repository owner name"
            placeholderTextColor={styles.input.placeholder}
          />
          {errors.repositoryOwnerName && touched.repositoryOwnerName && (
            <Text color="error">{errors.repositoryOwnerName}</Text>
          )}

          <TextInput
            style={[
              styles.input,
              errors.repositoryName && touched.repositoryName
                ? styles.inputError
                : null,
            ]}
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
            value={values.repositoryName}
            placeholder="Repository name"
            placeholderTextColor={styles.input.placeholder}
          />
          {errors.repositoryName && touched.repositoryName && (
            <Text color="error">{errors.repositoryName}</Text>
          )}

          <TextInput
            style={[
              styles.input,
              errors.rating && touched.rating ? styles.inputError : null,
            ]}
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            value={values.rating}
            placeholder="Rating between 0 and 100"
            placeholderTextColor={styles.input.placeholder}
          />
          {errors.rating && touched.rating && (
            <Text color="error">{errors.rating}</Text>
          )}

          <TextInput
            style={[
              styles.input,
              errors.review && touched.review ? styles.inputError : null,
            ]}
            onChangeText={handleChange('review')}
            onBlur={handleBlur('review')}
            value={values.review}
            placeholder="Review"
            placeholderTextColor={styles.input.placeholder}
            multiline={true}
          />
          {errors.review && touched.review && (
            <Text color="error">{errors.review}</Text>
          )}

          <Button title="Create a review" onPress={() => handleSubmit()} />
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;

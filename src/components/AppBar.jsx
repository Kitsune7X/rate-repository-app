// @ts-check
import Constants from 'expo-constants';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Link } from 'react-router-native';
import useSignOut from '../hooks/useSignOut';
import theme from '../theme';
import Text from './Text';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
    height: 70,
    paddingHorizontal: 20,
  },
  scrollViewContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  interactiveView: {
    flexDirection: 'row',
    gap: 20,
  },
});

// App Bar component
const AppBar = () => {
  const currentUser = useCurrentUser();

  const signOut = useSignOut();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        <Link to="/">
          <Text color="subheading" fontSize="subheading" fontWeight="bold">
            Repositories
          </Text>
        </Link>

        {/* Sign in, Sign out Tab */}
        {currentUser.data?.me ? (
          <View style={styles.interactiveView}>
            {/* Create a review route */}
            <Link to="/create-a-review">
              <Text color="subheading" fontSize="subheading" fontWeight="bold">
                Create a review
              </Text>
            </Link>

            {/* My reviews route */}
            <Link to="/my-reviews">
              <Text color="subheading" fontSize="subheading" fontWeight="bold">
                My reviews
              </Text>
            </Link>

            {/* Sign out route */}
            <Pressable onPress={async () => await signOut()}>
              <Text color="subheading" fontSize="subheading" fontWeight="bold">
                Sign out
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.interactiveView}>
            <Link to="/signin">
              <Text color="subheading" fontSize="subheading" fontWeight="bold">
                Sign in
              </Text>
            </Link>
            <Link to="/signup">
              <Text color="subheading" fontSize="subheading" fontWeight="bold">
                Sign up
              </Text>
            </Link>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;

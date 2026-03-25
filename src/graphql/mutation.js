import { gql } from '@apollo/client';
import { REPOSITORY_FRAGMENT } from './fragments';

export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      rating
      repositoryId
      repository {
        ...RepositoryFragment
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      createdAt
      id
      username
    }
  }
`;

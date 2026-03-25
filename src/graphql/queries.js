import { gql } from '@apollo/client';
import { REPOSITORY_FRAGMENT } from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepositoryFragment
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryFragment
      url
      reviews {
        edges {
          node {
            id
            user {
              username
              id
            }
            rating
            createdAt
            text
          }
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;

export const GET_CURRENT_USER = gql`
  query Me($includeReviews: Boolean = false) {
    me {
      id
      username

      reviews @include(if: $includeReviews) {
        edges {
          node {
            rating
            repository {
              fullName
            }
            createdAt
            text
          }
        }
      }
    }
  }
`;

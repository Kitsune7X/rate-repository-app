import { gql } from '@apollo/client';
import { REPOSITORY_FRAGMENT } from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      edges {
        node {
          ...RepositoryFragment
        }
      }

      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...RepositoryFragment
      url
      reviews(first: $first, after: $after) {
        totalCount
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
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
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
            id
            rating
            repository {
              fullName
              id
            }
            createdAt
            text
          }
        }
      }
    }
  }
`;

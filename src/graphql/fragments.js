import { gql } from '@apollo/client';

export const REPOSITORY_FRAGMENT = gql`
  fragment RepositoryFragment on Repository {
    id
    description
    forksCount
    fullName
    language
    ratingAverage
    ownerAvatarUrl
    reviewCount
    stargazersCount
  }
`;

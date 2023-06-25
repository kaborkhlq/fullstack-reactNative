import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query repositories {
    repositories {
      edges {
        node {
          fullName
          forksCount
          ratingAverage
          id
          stargazersCount
          watchersCount
          reviewCount
          ownerAvatarUrl
          description
          language
        }
      }
    }
  }
`;

export const ME = gql`
query me {
  me {
    id
    username
  }
}
`;
// other queries...
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
          url
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

export const GET_REPOSITORY = gql `
query Repository($repositoryId: ID!) {
  repository(id: $repositoryId) {
    description
    url
    forksCount
    language
    name
    ownerAvatarUrl
    fullName
    ratingAverage
    reviewCount
    stargazersCount
  }
}
`;

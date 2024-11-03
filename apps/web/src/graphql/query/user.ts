import { graphql } from "../../gql";

export const verifyGoogleToken = graphql(`
  #graphql
  query VerifyGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`) as any;

export const getCurrentUser = graphql(`
  #graphql
  query GetCurrentUser {
    getCurrentUser {
      id
      firstName
      lastName
      profileImageURL
      tweets {
        content
        imageURL
      }
    }
  }
`);

import { graphql } from "../../gql";


export const verifyGoogleToken = graphql(`#graphql
  query VerifyGoogleToken($token: String!) {
    vefifyGoogleToken(token: $token)
  }
`);
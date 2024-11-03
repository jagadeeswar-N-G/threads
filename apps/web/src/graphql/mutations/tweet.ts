import { graphql } from "@/src/gql";


export const createTweetMutation = graphql(`
  mutation CreateTweet($payload: CreateTweet!) {
    createTweet(payload: $payload) {
      id
      content
      imageURL
    }
  }
`);
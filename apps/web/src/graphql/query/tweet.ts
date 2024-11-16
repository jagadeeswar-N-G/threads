import { graphql } from "@/src/gql";
import { gql } from "graphql-request";

export const getAllTweetsQuery = graphql(`
  #graphql
  query GetAllTweets {
    getAllTweets {
      id
      content
      imageURL
      author {
        firstName
        lastName
        profileImageURL
      }
    }
  }
`);

export const getSignedURLForTweetQuery = gql`
  query GetSignedURL($imageType: String!) {
    getSignedURLForTweet(ImageType: $imageType)
  }
`;

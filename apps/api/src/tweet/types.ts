export const types = `#graphql
    input CreateTweet {
        content: String!
        imageURL: String
    }
    
    type Tweet {
        id: ID!
        content: String!
        author: User
        imageURL: String
    }
`;
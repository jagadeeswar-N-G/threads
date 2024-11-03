import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { graphQLClient } from "../clients/api";
import { getAllTweetsQuery } from "../graphql/query/tweet";
import { createTweetMutation } from "../graphql/mutations/tweet";
import { CreateTweet } from "../gql/graphql";

interface Author {
  firstName: string;
  lastName: string;
  profileImageURL?: string;
}

interface Tweet {
  id: string;
  content: string;
  imageURL?: string; // Optional if not all tweets have an image
  author: Author;
}

interface QueryResponse {
  getAllTweets: Tweet[];
}

export const useGetAllTweets = () => {
  const query = useQuery<QueryResponse>({
    queryKey: ["all-tweets"],
    queryFn: async () => {
      try {
        // Ensure you return the result of the request
        return await graphQLClient.request<QueryResponse>(
          getAllTweetsQuery as any
        );
      } catch (error) {
        console.error("error while fetching all the tweets", error);
        throw error;
      }
    },
  });

  return { ...query, tweets: query.data?.getAllTweets };
};

interface CreateTweetData {
  content: string;
  imageURL?: string;
}

export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateTweetData) => {
      try {
        const response = await graphQLClient.request(createTweetMutation, {
          payload: {
            content: payload.content,
            imageURL: payload.imageURL,
          },
        });
        return response.createTweet;
      } catch (error) {
        console.error("Mutation error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
    },
  });
};

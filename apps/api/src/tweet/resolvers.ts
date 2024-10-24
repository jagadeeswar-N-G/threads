import { GraphqlContext } from "../types/interfaces";
import { prisma } from "../db";

type CreateTweetPayload = {
  content: string;
  imageURL?: string;
};
const mutations = {
  createTweet: async (
    parent: any,
    { payload }: { payload: CreateTweetPayload },
    context: GraphqlContext
  ) => {
    if (!context.user) {
      throw new Error("User not authenticated");
    }
    const tweet = await prisma.tweet.create({
      data: {
        content: payload.content,
        ImageURL: payload.imageURL,
        author: {
          connect: {
            id: context?.user?.id,
          },
        },
      },
    });
    return tweet;
  },
};

export const resolvers = {
  mutations,
};

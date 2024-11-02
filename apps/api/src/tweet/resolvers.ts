import { GraphqlContext } from "../types/interfaces";
import { prisma } from "../db";
import { Tweet } from "@prisma/client";

type CreateTweetPayload = {
  content: string;
  imageURL?: string;
};

const queries = {
  getAllTweets: () => prisma.tweet.findMany({orderBy:{ createdAt:"desc"}})
}
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

const userResolver = {
     Tweet:{
      author: (parent: Tweet) => prisma.user.findUnique({where : {id: parent.authorId}})
     }
}
export const resolvers = {
  mutations,
  userResolver,
  queries
};

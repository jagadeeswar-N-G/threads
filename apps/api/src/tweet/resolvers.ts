import { GraphqlContext } from "../types/interfaces";
import { prisma } from "../db";
import { Tweet } from "@prisma/client";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

type CreateTweetPayload = {
  content: string;
  imageURL?: string;
};

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const queries = {
  getAllTweets: () => prisma.tweet.findMany({orderBy:{ createdAt:"desc"}}),
  getSignedURLForTweet: async(parent:any, {ImageType}:{ImageType:string},  context: GraphqlContext) =>{
    if(!context.user) {
      throw new Error("User not authenticated");
    }
    const allowedImageTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
    if(!allowedImageTypes.includes(ImageType)) {
      throw new Error("Invalid Image Type");
    }
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `${context.user.id}/${context.user.id}-${Date.now()}.${ImageType}`,
    });

    const SignedURL = await getSignedUrl(s3, putObjectCommand);
    return SignedURL;
   
  }
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
        imageURL: payload.imageURL,
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

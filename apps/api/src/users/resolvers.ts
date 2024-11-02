import axios, { get } from "axios"
import { prisma } from "../db";
import JwtService from "../services/jwt";
import { GraphqlContext } from "../types/interfaces";
import { Tweet } from "../tweet";
import { User } from "@prisma/client";

export interface GoogleUserPayload {
    iss?: string; // Issuer
    azp?: string; // Authorized party
    aud?: string; // Audience
    sub?: string; // Subject
    email: string; // User email
    email_verified?: string; // Email verification status
    nbf?: string; // Not before
    name?: string; // Full name
    picture?: string; // Profile picture URL
    given_name: string; // Given name
    iat?: string; // Issued at
    exp?: string; // Expiration time
    jti?: string; // JWT ID
    alg?: string; // Algorithm
    kid?: string; // Key ID
    typ?: string; // Type
  }
  
const queries = {
  verifyGoogleToken: async (
    _: any,
    { token }: { token: string }
  ) => {
    try {
      const googleToken = token;
      const googleOauthURL = new URL('https://oauth2.googleapis.com/tokeninfo');
      googleOauthURL.searchParams.set('id_token', googleToken);
  
      // Fetch user data from Google
      const { data } = await axios.get(googleOauthURL.toString(), {
        responseType: 'json',
      });
  
      // Check if the user already exists in the database
      const user = await prisma.user.findUnique({
        where: { email: data.email },
      });
  
      // If the user does not exist, create a new user
      if (!user) {
        await prisma.user.create({
          data: {
            email: data.email,
            firstName: data.given_name,
            lastName: data.name,
            profileImageURL: data.picture,
          },
        });
      }
  
      // Retrieve the user from the database (either existing or newly created)
      const userDB = await prisma.user.findUnique({
        where: { email: data.email },
      });
  
      if (!userDB) {
        throw new Error("User not found after creation.");
      }
  
      const JWTtoken = await JwtService.generateTokenForUser(userDB);
      return JWTtoken;
    } catch (error) {
      console.error("Error in verifyGoogleToken:", error);
      // Optionally, you can throw a custom error or return null
      throw new Error("Failed to verify Google token");
    }
  },
    getCurrentUser: async(_: any, __:any, context: GraphqlContext) => {
        if(!context.user){
            throw new Error('Not authenticated')
        }
        const user = await prisma.user.findUnique({
            where: { id: context.user?.id }
        })
        return user
    }
}

const tweetResolver = {
  User: {
    tweets: (parent: User) => prisma.tweet.findMany({where: {author: {id: parent.id}}})
  }

}
export const resolvers = {queries,tweetResolver}
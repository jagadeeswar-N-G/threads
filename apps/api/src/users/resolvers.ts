import axios, { get } from "axios"
import { prisma } from "../db";
import JwtService from "../services/jwt";
import { GraphqlContext } from "../types/interfaces";

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
    vefifyGoogleToken: async(_:any, {token}:{token:string}) => {
        const googleToken = token;
       const googleOauthURl = new URL('https://oauth2.googleapis.com/tokeninfo')
       googleOauthURl.searchParams.set('id_token', googleToken)

       const {data} = await axios.get<GoogleUserPayload>(googleOauthURl.toString(), {
        responseType: 'json'
       })

      const user = await prisma.user.findUnique({
        where: {email: data.email}
      })

      if(!user){
         await prisma.user.create({
            data: {
                email: data.email,
                firstName: data.given_name,
                lastName: data.name,
                profileImageURL: data.picture
            }
         })
      }
      const userDB = await prisma.user.findUnique({
        where: {email: data.email}
      })
      if(!userDB) return null
      const JWTtoken = await JwtService.generateTokenForUser(userDB)
      return JWTtoken
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
export const resolvers = {queries}
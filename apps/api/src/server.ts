import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import bodyParser from "body-parser";
import { User } from "./users";
import cors from "cors";
import JwtService from "./services/jwt";
import { GraphqlContext } from "./types/interfaces";

export async function createApolloServer(): Promise<express.Express> {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors({
    origin: '*', // For development; restrict in production
  }));
  
  const server = new ApolloServer<GraphqlContext>({
    typeDefs: `
       ${User.types}
       type Query {
         ${User.queries}
       }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
    },
  });
  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<GraphqlContext> => {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined;
        if (token) {
          try {
            const user = await JwtService.verifyToken(token);
            return { user };
          } catch (err) {
            console.error("JWT Verification Error:", err);
            return { user: undefined };
          }
        }
        return { user: undefined };
      },
    })
  );

  return app;
}
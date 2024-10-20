import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import bodyParser from "body-parser";
import { User } from "./users";
import cors from "cors";

export async function createApolloServer(): Promise<express.Express> {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  const server = new ApolloServer({
    typeDefs: `
       ${User.types}
       type Query {
         ${User.queries}
       }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries
      }
    },
  });
  await server.start();
  app.use(
    '/graphql', expressMiddleware(server)
  );

  return app;
}
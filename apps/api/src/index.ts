import {createApolloServer} from "./server"

async function main() {
  const app = await createApolloServer();
  app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001/graphql");
  });
}

main();
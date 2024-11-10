import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { typeDefs } from "./schema";
import { dataStore } from "./dataStore";
import { resolvers } from "./resolvers";

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await startServer;
  apolloServer.createHandler({
    path: "/api/graphql",
    onHealthCheck: () =>
      new Promise<void>((resolve, reject) => {
        if (dataStore.length > 0) resolve();
        else reject(new Error("No data available"));
      }),
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

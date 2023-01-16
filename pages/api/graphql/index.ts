import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import type { PageConfig } from "next";
import { buildSchema } from "type-graphql";
import CampaignResolver from "../../../src/resolvers/CampaignResolver";
import SqliteDataSource from "../../../src/SqliteDataSource";
import ActorResolver from "../../../src/resolvers/ActorResolver";
import ConversationResolver from "../../../src/resolvers/ConversationResolver";
import LocationResolver from "../../../src/resolvers/LocationResolver";
import MessageResolver from "../../../src/resolvers/MessageResolver";

// disable next js from handling this route
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

// Should initialize the data source early
const dataSource = await SqliteDataSource.getInstance();

const schema = await buildSchema({
  resolvers: [
    ActorResolver,
    CampaignResolver,
    ConversationResolver,
    LocationResolver,
    MessageResolver,
  ],
  validate: false,
})

const apolloServer = new ApolloServer({ schema });

await apolloServer.start()

export default apolloServer.createHandler({ path: "/api/graphql" });

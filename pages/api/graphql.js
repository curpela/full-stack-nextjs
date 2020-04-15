import { ApolloServer, gql } from "apollo-server-micro";
import Knex from "knex";

const db = new Knex({
    client: "pg",
    connection: process.env.DATABASE_URL
})

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: (_parent, _args, _context) => {
      return "Hello!";
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // enables introspection of the schema
  playground: true, // enables the actual playground
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;

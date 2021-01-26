import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';

import resolvers from '@/main/graphql/resolvers';
import typeDefs from '@/main/graphql/type-defs';

export const setupApolloServer = (app: Application): void => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
  });

  server.applyMiddleware({ app });
};

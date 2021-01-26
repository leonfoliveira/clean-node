import {
  ApolloServer,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server-express';
import { Application } from 'express';
import { GraphQLError } from 'graphql';

import resolvers from '@/main/graphql/resolvers';
import typeDefs from '@/main/graphql/type-defs';

const checkError = (error: GraphQLError, errorName: string): boolean => {
  return [error.name, error.originalError?.name].includes(errorName);
};

const handleErrors = (response: any, errors: readonly GraphQLError[]): void => {
  const error = errors[0];

  if (error) {
    delete response.data;

    response.errors = error.message;
    if (checkError(error, UserInputError.name)) response.http.status = 401;
    else if (checkError(error, AuthenticationError.name)) response.http.status = 401;
    else if (checkError(error, ForbiddenError.name)) response.http.status = 401;
    else response.http.status = 500;
  }
};

export const setupApolloServer = (app: Application): void => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    plugins: [
      {
        requestDidStart: (): Record<string, any> => ({
          willSendResponse: ({ response, errors }): void => handleErrors(response, errors),
        }),
      },
    ],
  });

  server.applyMiddleware({ app });
};

import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server-express';

import { EmailInUseError } from '@/presentation/errors';
import { Controller } from '@/presentation/interfaces';

export const adaptResolver = async (
  controller: Controller,
  args?: any,
  context?: any,
): Promise<any> => {
  const httpResponse = await controller.handle({ ...args, ...context?.headers } || {});

  switch (httpResponse.statusCode) {
    case 200:
    case 201:
    case 204:
      return httpResponse.body;
    case 400:
      throw new UserInputError(httpResponse.body.message);
    case 401:
      throw new AuthenticationError(httpResponse.body.message);
    case 403:
      throw new ForbiddenError(httpResponse.body.message);
    case 409:
      throw new EmailInUseError();
    default:
      throw new ApolloError(httpResponse.body.message);
  }
};

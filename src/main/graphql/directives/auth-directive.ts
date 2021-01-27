import { ForbiddenError, SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver, GraphQLField } from 'graphql';

import { makeAuthMiddleware } from '@/main/factories/middlewares';

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>): any {
    const { resolve = defaultFieldResolver } = field;
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (parent, args, context, info): Promise<any> => {
      const request: any = {
        accessToken: context?.req?.headers?.['x-access-token'],
      };

      const httpResponse = await makeAuthMiddleware().handle(request);

      if (httpResponse.statusCode === 200) {
        Object.assign(context?.req.headers, httpResponse.body);
        return resolve.call(this, parent, args, context, info);
      }
      throw new ForbiddenError(httpResponse.body.message);
    };
  }
}

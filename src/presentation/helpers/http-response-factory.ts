import { ServerError, UnauthorizedError } from '@/presentation/errors';
import { HttpResponse } from '@/presentation/interfaces';

export class HttpResponseFactory {
  static makeOk(data: any): HttpResponse {
    return { statusCode: 200, body: data };
  }

  static makeCreated(): HttpResponse {
    return { statusCode: 201 };
  }

  static makeNoContent(): HttpResponse {
    return { statusCode: 204 };
  }

  static makeUnauthorized(): HttpResponse {
    return { statusCode: 401, body: new UnauthorizedError() };
  }

  static makeForbidden(error: Error): HttpResponse {
    return { statusCode: 403, body: error };
  }

  static makeInternalServerError(error: Error): HttpResponse {
    return { statusCode: 500, body: new ServerError(error.stack) };
  }
}

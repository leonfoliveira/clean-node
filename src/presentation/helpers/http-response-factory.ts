import { ServerError, UnauthorizedError } from '@/presentation/errors';
import { HttpResponse } from '@/presentation/interfaces';

export class HttpResponseFactory {
  private constructor(public statusCode: number, public body: any) {}

  static makeOk(data: any): HttpResponse {
    return { statusCode: 200, body: data };
  }

  static makeBadRequest(error: Error): HttpResponse {
    return { statusCode: 400, body: error };
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

import { ServerError, UnauthorizedError } from '@/presentation/errors';

export type HttpRequest = {
  body?: any;
};

export class HttpResponse {
  private constructor(public statusCode: number, public body: any) {}

  static Ok(data: any): HttpResponse {
    return new HttpResponse(200, data);
  }

  static BadRequest(error: Error): HttpResponse {
    return new HttpResponse(400, error);
  }

  static Unauthorized(): HttpResponse {
    return new HttpResponse(401, new UnauthorizedError());
  }

  static InternalServerError(error: Error): HttpResponse {
    return new HttpResponse(500, new ServerError(error.stack));
  }
}

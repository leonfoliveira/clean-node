import { ServerError } from '@/presentation/errors';
import { HttpResponse } from '@/presentation/protocols';

export abstract class Response {
  static Ok(data: any): HttpResponse {
    return {
      statusCode: 200,
      body: data,
    };
  }

  static BadRequest(error: Error): HttpResponse {
    return {
      statusCode: 400,
      body: error,
    };
  }

  static InternalServerError(error: Error): HttpResponse {
    return {
      statusCode: 500,
      body: new ServerError(error.stack),
    };
  }
}

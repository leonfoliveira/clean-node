import { AccessDeniedError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { HttpRequest, HttpResponse, Middleware } from '@/presentation/interfaces';

export class AuthMiddleware implements Middleware {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return HttpResponseFactory.makeForbidden(new AccessDeniedError());
  }
}

import { LoadAccountByToken } from '@/domain/usecases';
import { AccessDeniedError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { HttpRequest, HttpResponse, Middleware } from '@/presentation/interfaces';

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token'];

    if (accessToken) {
      const account = await this.loadAccountByToken.load(httpRequest.headers['x-access-token']);
      if (account) {
        return HttpResponseFactory.makeOk({
          accountId: account.id,
        });
      }
    }

    return HttpResponseFactory.makeForbidden(new AccessDeniedError());
  }
}

import { LoadAccountByToken } from '@/domain/usecases';
import { AccessDeniedError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { HttpRequest, HttpResponse, Middleware } from '@/presentation/interfaces';

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token'];

      if (accessToken) {
        const account = await this.loadAccountByToken.load({
          accessToken: httpRequest.headers['x-access-token'],
          role: this.role,
        });
        if (account) {
          return HttpResponseFactory.makeOk({
            accountId: account.id,
          });
        }
      }

      return HttpResponseFactory.makeForbidden(new AccessDeniedError());
    } catch (error) {
      return HttpResponseFactory.makeInternalServerError(error);
    }
  }
}

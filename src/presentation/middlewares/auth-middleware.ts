import { LoadAccountByToken } from '@/domain/usecases';
import { AccessDeniedError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { HttpResponse, Middleware } from '@/presentation/interfaces';

export class AuthMiddleware implements Middleware<AuthMiddleware.Request> {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string,
  ) {}

  async handle(request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request;

      if (accessToken) {
        const account = await this.loadAccountByToken.load({
          accessToken,
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

export namespace AuthMiddleware {
  export type Request = {
    accessToken: string;
  };
}

import { AddAccount, Authentication } from '@/domain/usecases';
import { EmailInUseError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@/presentation/interfaces';

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password } = httpRequest.body;
      const account = await this.addAccount.add({ name, email, password });
      if (!account) {
        return HttpResponseFactory.makeConflict(new EmailInUseError());
      }

      const authorization = await this.authentication.auth({ email, password });

      return HttpResponseFactory.makeOk(authorization);
    } catch (error) {
      return HttpResponseFactory.makeInternalServerError(error);
    }
  }
}

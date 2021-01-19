import { AddAccount, Authentication } from '@/domain/usecases';
import { EmailInUseError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { Controller, HttpRequest, HttpResponse, Validator } from '@/presentation/interfaces';

export class SignUpController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body);
      if (error) {
        return HttpResponseFactory.makeBadRequest(error);
      }

      const { name, email, password } = httpRequest.body;
      const account = await this.addAccount.add({ name, email, password });
      if (!account) {
        return HttpResponseFactory.makeForbidden(new EmailInUseError());
      }

      const authorization = await this.authentication.auth({ email, password });

      return HttpResponseFactory.makeOk(authorization);
    } catch (error) {
      return HttpResponseFactory.makeInternalServerError(error);
    }
  }
}

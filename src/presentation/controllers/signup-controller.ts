import { AddAccount, Authentication } from '@/domain/usecases';
import { Controller, HttpRequest, HttpResponse, Validator } from '@/presentation/interfaces';

import { EmailInUseError } from '../errors';

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
        return HttpResponse.BadRequest(error);
      }

      const { name, email, password } = httpRequest.body;
      const account = await this.addAccount.add({ name, email, password });
      if (!account) {
        return HttpResponse.Forbidden(new EmailInUseError());
      }

      const authorization = await this.authentication.auth({ email, password });

      return HttpResponse.Ok(authorization);
    } catch (error) {
      return HttpResponse.InternalServerError(error);
    }
  }
}

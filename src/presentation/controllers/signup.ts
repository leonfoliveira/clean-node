import { AddAccount } from '@/domain/usecases';
import { InvalidParamError, MissingParamError } from '@/presentation/errors';
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '@/presentation/interfaces';

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return HttpResponse.BadRequest(new MissingParamError(field));
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body;
      if (password !== passwordConfirmation) {
        return HttpResponse.BadRequest(new InvalidParamError('passwordConfirmation'));
      }
      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return HttpResponse.BadRequest(new InvalidParamError('email'));
      }

      const account = await this.addAccount.add({ name, email, password });

      return HttpResponse.Ok(account);
    } catch (error) {
      return HttpResponse.InternalServerError(error);
    }
  }
}

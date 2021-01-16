import { AddAccount } from '@/domain/usecases';
import { InvalidParamError, MissingParamError } from '@/presentation/errors';
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
  Validation,
} from '@/presentation/interfaces';

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return HttpResponse.BadRequest(error);
      }

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

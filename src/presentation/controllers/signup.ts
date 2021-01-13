import { InvalidParamError, MissingParamError } from '@/presentation/errors';
import { badRequest, internalServerError } from '@/presentation/helpers';
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '@/presentation/protocols';

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }
      return null;
    } catch {
      return internalServerError();
    }
  }
}

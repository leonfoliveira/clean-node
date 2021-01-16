import { Authentication } from '@/domain/usecases';
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '@/presentation/interfaces';

import { InvalidParamError, MissingParamError } from '../errors';

export class LoginController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return HttpResponse.BadRequest(new MissingParamError(field));
        }
      }
      const { email, password } = httpRequest.body;
      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return HttpResponse.BadRequest(new InvalidParamError('email'));
      }

      const authorization = await this.authentication.auth({ email, password });
      if (!authorization) {
        return HttpResponse.Unauthorized();
      }

      return null;
    } catch (error) {
      return HttpResponse.InternalServerError(error);
    }
  }
}

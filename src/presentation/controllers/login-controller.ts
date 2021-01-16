import { Controller, EmailValidator, HttpRequest, HttpResponse } from '@/presentation/interfaces';

import { MissingParamError } from '../errors';

export class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return HttpResponse.BadRequest(new MissingParamError('email'));
    }
    if (!httpRequest.body.password) {
      return HttpResponse.BadRequest(new MissingParamError('password'));
    }
    const { email } = httpRequest.body;
    this.emailValidator.isValid(email);
    return null;
  }
}

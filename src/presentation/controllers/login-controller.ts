import { Controller, HttpRequest, HttpResponse } from '@/presentation/interfaces';

import { MissingParamError } from '../errors';

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return HttpResponse.BadRequest(new MissingParamError('email'));
    }
    if (!httpRequest.body.password) {
      return HttpResponse.BadRequest(new MissingParamError('password'));
    }
    return null;
  }
}

import { Controller, HttpRequest, HttpResponse } from '@/presentation/interfaces';

import { MissingParamError } from '../errors';

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return HttpResponse.BadRequest(new MissingParamError('email'));
  }
}

import { Authentication } from '@/domain/usecases';
import { HttpResponseFactory } from '@/presentation/helpers';
import { Controller, HttpRequest, HttpResponse, Validator } from '@/presentation/interfaces';

export class LoginController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly authentication: Authentication,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body);
      if (error) {
        return HttpResponseFactory.makeBadRequest(error);
      }

      const { email, password } = httpRequest.body;
      const authorization = await this.authentication.auth({ email, password });
      if (!authorization) {
        return HttpResponseFactory.makeUnauthorized();
      }

      return HttpResponseFactory.makeOk(authorization);
    } catch (error) {
      return HttpResponseFactory.makeInternalServerError(error);
    }
  }
}

import { Authentication } from '@/domain/usecases';
import { Controller, HttpRequest, HttpResponse, Validator } from '@/presentation/interfaces';

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validator: Validator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body);
      if (error) {
        return HttpResponse.BadRequest(error);
      }

      const { email, password } = httpRequest.body;
      const authorization = await this.authentication.auth({ email, password });
      if (!authorization) {
        return HttpResponse.Unauthorized();
      }

      return HttpResponse.Ok(authorization);
    } catch (error) {
      return HttpResponse.InternalServerError(error);
    }
  }
}

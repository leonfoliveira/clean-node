import { Authentication } from '@/domain/usecases';
import { HttpResponseFactory } from '@/presentation/helpers';
import { Controller, HttpResponse } from '@/presentation/interfaces';

export class LoginController implements Controller<LoginController.Request> {
  constructor(private readonly authentication: Authentication) {}

  async handle(request: LoginController.Request): Promise<HttpResponse> {
    try {
      const { email, password } = request;
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

export namespace LoginController {
  export type Request = {
    email: string;
    password: string;
  };
}

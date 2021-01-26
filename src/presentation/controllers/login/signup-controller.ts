import { AddAccount, Authentication } from '@/domain/usecases';
import { EmailInUseError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { Controller, HttpResponse } from '@/presentation/interfaces';

export class SignUpController implements Controller<SignUpController.Request, HttpResponse> {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication,
  ) {}

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const { name, email, password } = request;
      const account = await this.addAccount.add({ name, email, password });
      if (!account) {
        return HttpResponseFactory.makeConflict(new EmailInUseError());
      }

      const authorization = await this.authentication.auth({ email, password });

      return HttpResponseFactory.makeOk(authorization);
    } catch (error) {
      return HttpResponseFactory.makeInternalServerError(error);
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}

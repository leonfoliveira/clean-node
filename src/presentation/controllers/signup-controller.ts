import { AddAccount, Authentication } from '@/domain/usecases';
import { Controller, HttpRequest, HttpResponse, Validator } from '@/presentation/interfaces';

export class SignUpController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body);
      if (error) {
        return HttpResponse.BadRequest(error);
      }

      const { name, email, password } = httpRequest.body;
      await this.addAccount.add({ name, email, password });

      const authorization = await this.authentication.auth({ email, password });

      return HttpResponse.Ok(authorization);
    } catch (error) {
      return HttpResponse.InternalServerError(error);
    }
  }
}

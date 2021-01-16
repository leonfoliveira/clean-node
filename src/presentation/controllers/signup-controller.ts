import { AddAccount } from '@/domain/usecases';
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
  Validator,
} from '@/presentation/interfaces';

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly validator: Validator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body);
      if (error) {
        return HttpResponse.BadRequest(error);
      }

      const { name, email, password } = httpRequest.body;
      const account = await this.addAccount.add({ name, email, password });

      return HttpResponse.Ok(account);
    } catch (error) {
      return HttpResponse.InternalServerError(error);
    }
  }
}

import { MissingParamError } from '@/presentation/errors';
import { badRequest } from '@/presentation/helpers';
import { HttpRequest, HttpResponse } from '@/presentation/protocols';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
    return null;
  }
}

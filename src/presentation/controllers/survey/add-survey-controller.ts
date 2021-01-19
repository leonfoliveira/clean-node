import { HttpResponseFactory } from '@/presentation/helpers';
import { Controller, HttpRequest, HttpResponse, Validator } from '@/presentation/interfaces';

export class AddSurveyController implements Controller {
  constructor(private readonly validator: Validator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body);
    return HttpResponseFactory.makeBadRequest(error);
  }
}

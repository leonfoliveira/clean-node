import { Controller, HttpRequest, HttpResponse, Validator } from '@/presentation/interfaces';

export class AddSurveyController implements Controller {
  constructor(private readonly validator: Validator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.validator.validate(httpRequest.body);
    return null;
  }
}

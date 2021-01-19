import { AddSurvey } from '@/domain/usecases';
import { HttpResponseFactory } from '@/presentation/helpers';
import { Controller, HttpRequest, HttpResponse, Validator } from '@/presentation/interfaces';

export class AddSurveyController implements Controller {
  constructor(private readonly validator: Validator, private readonly addSurvey: AddSurvey) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body);
    if (error) {
      return HttpResponseFactory.makeBadRequest(error);
    }

    await this.addSurvey.add(httpRequest.body);

    return null;
  }
}

import { AddSurvey } from '@/domain/usecases';
import { HttpResponseFactory } from '@/presentation/helpers';
import { Controller, HttpRequest, HttpResponse, Validator } from '@/presentation/interfaces';

export class AddSurveyController implements Controller {
  constructor(private readonly validator: Validator, private readonly addSurvey: AddSurvey) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body);
      if (error) {
        return HttpResponseFactory.makeBadRequest(error);
      }

      const { question, answers } = httpRequest.body;
      await this.addSurvey.add({ question, answers });

      return null;
    } catch (error) {
      return HttpResponseFactory.makeInternalServerError(error);
    }
  }
}

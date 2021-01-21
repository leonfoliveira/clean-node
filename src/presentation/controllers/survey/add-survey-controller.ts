import { AddSurvey } from '@/domain/usecases';
import { HttpResponseFactory } from '@/presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@/presentation/interfaces';

export class AddSurveyController implements Controller {
  constructor(private readonly addSurvey: AddSurvey) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { question, answers } = httpRequest.body;
      await this.addSurvey.add({ question, answers });

      return HttpResponseFactory.makeCreated();
    } catch (error) {
      return HttpResponseFactory.makeInternalServerError(error);
    }
  }
}

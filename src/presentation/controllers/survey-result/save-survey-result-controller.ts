import { LoadSurveyById } from '@/domain/usecases';
import { RegisterNotFoundError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@/presentation/interfaces';

export class SaveSurveyResultController implements Controller {
  constructor(private readonly loadSurveyById: LoadSurveyById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const survey = await this.loadSurveyById.loadById(surveyId);
      if (!survey) {
        return HttpResponseFactory.makeNotFound(new RegisterNotFoundError('survey'));
      }

      const { answer } = httpRequest.body;
      if (!survey.answers.map((a) => a.answer).includes(answer)) {
        return HttpResponseFactory.makeNotFound(new RegisterNotFoundError('answer'));
      }

      return null;
    } catch (error) {
      return HttpResponseFactory.makeInternalServerError(error);
    }
  }
}

import { LoadSurveyById, LoadSurveyResult } from '@/domain/usecases';
import { RegisterNotFoundError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@/presentation/interfaces';

export class LoadSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById({
        id: httpRequest.params.surveyId,
      });
      if (!survey) {
        return HttpResponseFactory.makeNotFound(new RegisterNotFoundError('survey'));
      }

      await this.loadSurveyResult.load({
        surveyId: httpRequest.params.surveyId,
        accountId: httpRequest.headers.accountId,
      });
      return HttpResponseFactory.makeNotFound(new RegisterNotFoundError('surveyResult'));
    } catch (error) {
      return HttpResponseFactory.makeInternalServerError(error);
    }
  }
}

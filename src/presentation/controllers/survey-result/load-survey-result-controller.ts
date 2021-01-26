import { LoadSurveyById, LoadSurveyResult } from '@/domain/usecases';
import { RegisterNotFoundError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { Controller, HttpResponse } from '@/presentation/interfaces';

export class LoadSurveyResultController
  implements Controller<LoadSurveyResultController.Request, HttpResponse> {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult,
  ) {}

  async handle(request: LoadSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById({
        id: request.surveyId,
      });
      if (!survey) {
        return HttpResponseFactory.makeNotFound(new RegisterNotFoundError('survey'));
      }

      const surveyResult = await this.loadSurveyResult.load({
        surveyId: request.surveyId,
        accountId: request.accountId,
      });

      return HttpResponseFactory.makeOk(surveyResult);
    } catch (error) {
      return HttpResponseFactory.makeInternalServerError(error);
    }
  }
}

export namespace LoadSurveyResultController {
  export type Request = {
    surveyId: string;
    accountId: string;
  };
}

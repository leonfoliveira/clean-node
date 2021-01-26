import { LoadSurveyById, SaveSurveyResult } from '@/domain/usecases';
import { RegisterNotFoundError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { Controller, HttpResponse } from '@/presentation/interfaces';

export class SaveSurveyResultController
  implements Controller<SaveSurveyResultController.Request, HttpResponse> {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult,
  ) {}

  async handle(request: SaveSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { surveyId, accountId, answer } = request;
      const survey = await this.loadSurveyById.loadById({ id: surveyId });
      if (!survey) {
        return HttpResponseFactory.makeNotFound(new RegisterNotFoundError('survey'));
      }
      if (!survey.answers.map((a) => a.answer).includes(answer)) {
        return HttpResponseFactory.makeNotFound(new RegisterNotFoundError('answer'));
      }

      const surveyResult = await this.saveSurveyResult.save({
        surveyId,
        accountId,
        date: new Date(),
        answer,
      });

      return HttpResponseFactory.makeOk(surveyResult);
    } catch (error) {
      return HttpResponseFactory.makeInternalServerError(error);
    }
  }
}

export namespace SaveSurveyResultController {
  export type Request = {
    surveyId: string;
    accountId: string;
    answer: string;
  };
}

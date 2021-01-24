import { LoadSurveyResult } from '@/domain/usecases';
import { Controller, HttpRequest, HttpResponse } from '@/presentation/interfaces';

export class LoadSurveyResultController implements Controller {
  constructor(private readonly loadSurveyResult: LoadSurveyResult) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyResult.load({
      surveyId: httpRequest.params.surveyId,
      accountId: httpRequest.headers.accountId,
    });
    return null;
  }
}

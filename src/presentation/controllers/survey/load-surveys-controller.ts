import { LoadSurveys } from '@/domain/usecases';
import { HttpResponseFactory } from '@/presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@/presentation/interfaces';

export class LoadSurveysController implements Controller {
  constructor(private readonly loadSurvey: LoadSurveys) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurvey.loadAll({ accountId: httpRequest.headers.accountId });
      if (surveys.length === 0) {
        return HttpResponseFactory.makeNoContent();
      }

      return HttpResponseFactory.makeOk(surveys);
    } catch (error) {
      return HttpResponseFactory.makeInternalServerError(error);
    }
  }
}

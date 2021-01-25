import { LoadSurveys } from '@/domain/usecases';
import { HttpResponseFactory } from '@/presentation/helpers';
import { Controller, HttpResponse } from '@/presentation/interfaces';

export class LoadSurveysController implements Controller<LoadSurveysController.Request> {
  constructor(private readonly loadSurvey: LoadSurveys) {}

  async handle(request: LoadSurveysController.Request): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurvey.loadAll({ accountId: request.accountId });
      if (surveys.length === 0) {
        return HttpResponseFactory.makeNoContent();
      }

      return HttpResponseFactory.makeOk(surveys);
    } catch (error) {
      return HttpResponseFactory.makeInternalServerError(error);
    }
  }
}

export namespace LoadSurveysController {
  export type Request = {
    accountId: string;
  };
}

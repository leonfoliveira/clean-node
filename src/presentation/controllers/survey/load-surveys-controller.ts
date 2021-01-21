import { LoadSurveys } from '@/domain/usecases';
import { HttpResponseFactory } from '@/presentation/helpers';
import { Controller, HttpResponse } from '@/presentation/interfaces';

export class LoadSurveysController implements Controller {
  constructor(private readonly loadSurvey: LoadSurveys) {}

  async handle(): Promise<HttpResponse> {
    const surveys = await this.loadSurvey.load();

    return HttpResponseFactory.makeOk(surveys);
  }
}

import { LoadSurveys } from '@/domain/usecases';
import { Controller, HttpResponse } from '@/presentation/interfaces';

export class LoadSurveysController implements Controller {
  constructor(private readonly loadSurvey: LoadSurveys) {}

  async handle(): Promise<HttpResponse> {
    await this.loadSurvey.load();
    return null;
  }
}

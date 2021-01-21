import { LoadSurveysRepository } from '@/data/interfaces';
import { SurveyModel } from '@/domain/models';
import { LoadSurveys } from '@/domain/usecases';

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load(): Promise<SurveyModel[]> {
    return this.loadSurveysRepository.loadAll();
  }
}

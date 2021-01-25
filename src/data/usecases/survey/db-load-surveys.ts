import { LoadSurveysRepository } from '@/data/interfaces';
import { SurveyModel } from '@/domain/models';
import { LoadSurveys, LoadSurveysDTO } from '@/domain/usecases';

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async loadAll(params: LoadSurveysDTO): Promise<SurveyModel[]> {
    return this.loadSurveysRepository.loadAll(params.accountId);
  }
}

import { LoadSurveyResultRepository } from '@/data/interfaces';
import { SurveyResultModel } from '@/domain/models';
import { LoadSurveyResult, LoadSurveyResultDTO } from '@/domain/usecases';

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(private readonly loadSurveyResultRepository: LoadSurveyResultRepository) {}

  async load(params: LoadSurveyResultDTO): Promise<SurveyResultModel> {
    return this.loadSurveyResultRepository.loadBySurveyId(params.surveyId, params.accountId);
  }
}

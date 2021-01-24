import { LoadSurveyResultRepository, SaveSurveyResultRepository } from '@/data/interfaces';
import { SurveyResultModel } from '@/domain/models';
import { SaveSurveyResult, SaveSurveyResultDTO } from '@/domain/usecases';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
  ) {}

  async save(params: SaveSurveyResultDTO): Promise<SurveyResultModel> {
    await this.loadSurveyResultRepository.loadBySurveyId(params.surveyId, params.accountId);
    return this.saveSurveyResultRepository.save(params);
  }
}

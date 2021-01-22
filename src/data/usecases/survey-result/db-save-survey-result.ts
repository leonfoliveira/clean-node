import { SaveSurveyResultRepository } from '@/data/interfaces';
import { SurveyResultModel } from '@/domain/models';
import { SaveSurveyResult, SaveSurveyResultDTO } from '@/domain/usecases';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}

  async save(params: SaveSurveyResultDTO): Promise<SurveyResultModel> {
    return this.saveSurveyResultRepository.save(params);
  }
}

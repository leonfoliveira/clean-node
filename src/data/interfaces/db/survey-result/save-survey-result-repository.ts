import { SurveyResultModel } from '@/domain/models';
import { SaveSurveyResultDTO } from '@/domain/usecases';

export interface SaveSurveyResultRepository {
  save: (params: SaveSurveyResultRepositoryParams) => Promise<SurveyResultModel>;
}

export type SaveSurveyResultRepositoryParams = SaveSurveyResultDTO;

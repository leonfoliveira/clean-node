import { SaveSurveyResultDTO } from '@/domain/usecases';

export interface SaveSurveyResultRepository {
  save: (params: SaveSurveyResultRepositoryParams) => Promise<void>;
}

export type SaveSurveyResultRepositoryParams = SaveSurveyResultDTO;

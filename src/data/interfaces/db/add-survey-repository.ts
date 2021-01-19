import { SurveyModel } from '@/domain/models';
import { AddSurveyDTO } from '@/domain/usecases';

export interface AddSurveyRepository {
  add: (params: AddSurveyRepositoryParams) => Promise<SurveyModel>;
}

export type AddSurveyRepositoryParams = AddSurveyDTO;

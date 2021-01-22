import { SurveyModel } from '@/domain/models';

export interface AddSurvey {
  add: (params: AddSurveyDTO) => Promise<SurveyModel>;
}

export type AddSurveyDTO = Omit<SurveyModel, 'id'>;

import { SurveyModel } from '@/domain/models';

export interface LoadSurveyById {
  loadById: (params: LoadSurveyByIdDTO) => Promise<SurveyModel>;
}

export type LoadSurveyByIdDTO = {
  id: string;
};

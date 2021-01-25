import { SurveyModel } from '@/domain/models';

export interface LoadSurveys {
  loadAll: (params: LoadSurveysDTO) => Promise<SurveyModel[]>;
}

export type LoadSurveysDTO = {
  accountId: string;
};

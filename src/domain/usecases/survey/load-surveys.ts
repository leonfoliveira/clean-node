import { SurveyModel } from '@/domain/models';

export interface LoadSurveys {
  load: (params: LoadSurveysDTO) => Promise<SurveyModel[]>;
}

export type LoadSurveysDTO = {
  accountId: string;
};

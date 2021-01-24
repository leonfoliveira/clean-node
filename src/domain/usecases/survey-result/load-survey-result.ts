import { SurveyResultModel } from '@/domain/models';

export interface LoadSurveyResult {
  load(params: LoadSurveyResultDTO): Promise<SurveyResultModel>;
}

export type LoadSurveyResultDTO = {
  surveyId: string;
  accountId: string;
};

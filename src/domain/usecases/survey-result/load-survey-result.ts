import { SurveyResultModel } from '@/domain/models';

export interface LoadSurveyResult {
  save(params: LoadSurveyResultDTO): Promise<SurveyResultModel>;
}

export type LoadSurveyResultDTO = {
  surveyId: string;
};

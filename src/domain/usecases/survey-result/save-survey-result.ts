import { SurveyResultModel } from '@/domain/models';

export interface SaveSurveyResult {
  save(params: SaveSurveyResultDTO): Promise<SurveyResultModel>;
}

export type SaveSurveyResultDTO = {
  surveyId: string;
  accountId: string;
  answer: string;
  date: Date;
};

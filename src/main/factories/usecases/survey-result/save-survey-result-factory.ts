import { DbSaveSurveyResult } from '@/data/usecases';
import { SaveSurveyResult } from '@/domain/usecases';
import { makeSaveSurveyResultRepository } from '@/main/factories/infras';

export const makeSaveSurveyResult = (): SaveSurveyResult =>
  new DbSaveSurveyResult(makeSaveSurveyResultRepository());

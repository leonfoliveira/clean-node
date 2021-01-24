import { DbSaveSurveyResult } from '@/data/usecases';
import { SaveSurveyResult } from '@/domain/usecases';
import {
  makeSaveSurveyResultRepository,
  makeLoadSurveyResultRepository,
} from '@/main/factories/infras';

export const makeSaveSurveyResult = (): SaveSurveyResult =>
  new DbSaveSurveyResult(makeSaveSurveyResultRepository(), makeLoadSurveyResultRepository());

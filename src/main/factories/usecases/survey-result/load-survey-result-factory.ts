import { DbLoadSurveyResult } from '@/data/usecases';
import { LoadSurveyResult } from '@/domain/usecases';
import {
  makeLoadSurveyByIdRepository,
  makeLoadSurveyResultRepository,
} from '@/main/factories/infras';

export const makeLoadSurveyResult = (): LoadSurveyResult =>
  new DbLoadSurveyResult(makeLoadSurveyResultRepository(), makeLoadSurveyByIdRepository());

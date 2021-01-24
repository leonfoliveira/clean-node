import { makeLoadSurveyById, makeLoadSurveyResult } from '@/main/factories/usecases';
import { LoadSurveyResultController } from '@/presentation/controllers';

export const makeLoadSurveyResultController = (): LoadSurveyResultController =>
  new LoadSurveyResultController(makeLoadSurveyById(), makeLoadSurveyResult());

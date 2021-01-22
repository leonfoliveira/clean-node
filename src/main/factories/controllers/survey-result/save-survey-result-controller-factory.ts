import { makeLoadSurveyById, makeSaveSurveyResult } from '@/main/factories/usecases';
import { SaveSurveyResultController } from '@/presentation/controllers';

export const makeSaveSurveyResultController = (): SaveSurveyResultController =>
  new SaveSurveyResultController(makeLoadSurveyById(), makeSaveSurveyResult());

import { makeLoadSurveys } from '@/main/factories/usecases';
import { LoadSurveysController } from '@/presentation/controllers';

export const makeLoadSurveysController = (): LoadSurveysController =>
  new LoadSurveysController(makeLoadSurveys());

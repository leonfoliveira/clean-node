import { makeLoadSurveys } from '@/main/factories/usecases';
import { makeLogControllerDecorator } from '@/main/factories/utils';
import { LoadSurveysController } from '@/presentation/controllers';
import { Controller } from '@/presentation/interfaces';

export const makeLoadSurveysController = (): Controller =>
  makeLogControllerDecorator(new LoadSurveysController(makeLoadSurveys()));

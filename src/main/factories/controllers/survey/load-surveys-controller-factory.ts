import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeLoadSurveys } from '@/main/factories/usecases';
import { LoadSurveysController } from '@/presentation/controllers';
import { Controller } from '@/presentation/interfaces';

export const makeLoadSurveysController = (): Controller =>
  makeLogControllerDecorator(new LoadSurveysController(makeLoadSurveys()));

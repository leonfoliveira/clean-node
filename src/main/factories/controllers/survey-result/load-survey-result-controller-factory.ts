import { makeLoadSurveyById, makeLoadSurveyResult } from '@/main/factories/usecases';
import { makeLogControllerDecorator } from '@/main/factories/utils';
import { LoadSurveyResultController } from '@/presentation/controllers';
import { Controller } from '@/presentation/interfaces';

export const makeLoadSurveyResultController = (): Controller =>
  makeLogControllerDecorator(
    new LoadSurveyResultController(makeLoadSurveyById(), makeLoadSurveyResult()),
  );

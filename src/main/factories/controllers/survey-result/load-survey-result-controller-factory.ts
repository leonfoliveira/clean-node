import { makeLoadSurveyById, makeLoadSurveyResult } from '@/main/factories/usecases';
import { LoadSurveyResultController } from '@/presentation/controllers';
import { Controller } from '@/presentation/interfaces';

import { makeLogControllerDecorator } from '../../decorators';

export const makeLoadSurveyResultController = (): Controller =>
  makeLogControllerDecorator(
    new LoadSurveyResultController(makeLoadSurveyById(), makeLoadSurveyResult()),
  );

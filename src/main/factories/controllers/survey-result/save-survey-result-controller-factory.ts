import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeLoadSurveyById, makeSaveSurveyResult } from '@/main/factories/usecases';
import { SaveSurveyResultController } from '@/presentation/controllers';
import { Controller } from '@/presentation/interfaces';

export const makeSaveSurveyResultController = (): Controller =>
  makeLogControllerDecorator(
    new SaveSurveyResultController(makeLoadSurveyById(), makeSaveSurveyResult()),
  );

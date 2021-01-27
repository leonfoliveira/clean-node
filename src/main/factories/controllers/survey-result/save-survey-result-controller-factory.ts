import { makeLoadSurveyById, makeSaveSurveyResult } from '@/main/factories/usecases';
import { makeLogControllerDecorator } from '@/main/factories/utils';
import { SaveSurveyResultController } from '@/presentation/controllers';
import { Controller } from '@/presentation/interfaces';

export const makeSaveSurveyResultController = (): Controller =>
  makeLogControllerDecorator(
    new SaveSurveyResultController(makeLoadSurveyById(), makeSaveSurveyResult()),
  );

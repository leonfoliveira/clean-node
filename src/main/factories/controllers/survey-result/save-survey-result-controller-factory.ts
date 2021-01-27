import { makeLoadSurveyById, makeSaveSurveyResult } from '@/main/factories/usecases';
import { makeLogControllerDecorator, makeValidationControllerProxy } from '@/main/factories/utils';
import { makeSaveSurveyResultValidator } from '@/main/factories/validators';
import { SaveSurveyResultController } from '@/presentation/controllers';
import { Controller } from '@/presentation/interfaces';

export const makeSaveSurveyResultController = (): Controller =>
  makeValidationControllerProxy(
    makeSaveSurveyResultValidator(),
    makeLogControllerDecorator(
      new SaveSurveyResultController(makeLoadSurveyById(), makeSaveSurveyResult()),
    ),
  );

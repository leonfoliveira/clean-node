import { makeAddSurvey } from '@/main/factories/usecases';
import { makeLogControllerDecorator, makeValidationControllerProxy } from '@/main/factories/utils';
import { makeAddSurveyValidator } from '@/main/factories/validators';
import { AddSurveyController } from '@/presentation/controllers';
import { Controller } from '@/presentation/interfaces';

export const makeAddSurveyController = (): Controller =>
  makeValidationControllerProxy(
    makeAddSurveyValidator(),
    makeLogControllerDecorator(new AddSurveyController(makeAddSurvey())),
  );

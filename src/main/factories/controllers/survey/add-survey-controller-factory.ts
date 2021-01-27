import { makeAddSurvey } from '@/main/factories/usecases';
import { makeLogControllerDecorator } from '@/main/factories/utils';
import { AddSurveyController } from '@/presentation/controllers';
import { Controller } from '@/presentation/interfaces';

export const makeAddSurveyController = (): Controller =>
  makeLogControllerDecorator(new AddSurveyController(makeAddSurvey()));

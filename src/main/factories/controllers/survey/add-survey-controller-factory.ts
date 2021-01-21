import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeAddSurvey } from '@/main/factories/usecases';
import { AddSurveyController } from '@/presentation/controllers';
import { Controller } from '@/presentation/interfaces';

export const makeSurveyController = (): Controller =>
  makeLogControllerDecorator(new AddSurveyController(makeAddSurvey()));

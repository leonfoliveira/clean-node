import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeAddSurvey } from '@/main/factories/usecases';
import { AddSurveyController } from '@/presentation/controllers';
import { Controller, Validator } from '@/presentation/interfaces';
import { ValidatorComposite } from '@/validation/helpers';

export const makeSurveyController = (): Controller =>
  makeLogControllerDecorator(new AddSurveyController(makeSurveyValidator(), makeAddSurvey()));

export const makeSurveyValidator = (): Validator => new ValidatorComposite([]);

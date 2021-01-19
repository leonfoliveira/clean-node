import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeAddSurvey } from '@/main/factories/usecases';
import { AddSurveyController } from '@/presentation/controllers';
import { Controller, Validator } from '@/presentation/interfaces';
import { ValidatorBuilder, ValidatorComposite } from '@/validation/helpers';

export const makeSurveyController = (): Controller =>
  makeLogControllerDecorator(new AddSurveyController(makeSurveyValidator(), makeAddSurvey()));

export const makeSurveyValidator = (): Validator =>
  new ValidatorComposite([
    ...ValidatorBuilder.field('question').required().build(),
    ...ValidatorBuilder.field('answers').required().build(),
  ]);

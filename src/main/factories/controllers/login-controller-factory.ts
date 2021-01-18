import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeAuthentication } from '@/main/factories/usecases';
import { LoginController } from '@/presentation/controllers';
import { Controller, Validator } from '@/presentation/interfaces';
import { ValidatorBuilder, ValidatorComposite } from '@/validation/helpers';

export const makeLoginController = (): Controller =>
  makeLogControllerDecorator(new LoginController(makeAuthentication(), makeLoginValidator()));

export const makeLoginValidator = (): Validator =>
  new ValidatorComposite([
    ...ValidatorBuilder.field('email').required().email().build(),
    ...ValidatorBuilder.field('password').required().build(),
  ]);

import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeAddAccount, makeAuthentication } from '@/main/factories/usecases';
import { SignUpController } from '@/presentation/controllers';
import { Controller, Validator } from '@/presentation/interfaces';
import { ValidatorComposite, ValidatorBuilder } from '@/validation/helpers';

export const makeSignUpController = (): Controller =>
  makeLogControllerDecorator(
    new SignUpController(makeSignUpValidator(), makeAddAccount(), makeAuthentication()),
  );

export const makeSignUpValidator = (): Validator =>
  new ValidatorComposite([
    ...ValidatorBuilder.field('name').required().build(),
    ...ValidatorBuilder.field('email').required().email().build(),
    ...ValidatorBuilder.field('password').required().length({ min: 8 }).build(),
    ...ValidatorBuilder.field('passwordConfirmation').sameAs('password').build(),
  ]);

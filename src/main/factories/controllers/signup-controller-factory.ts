import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeAddAccount } from '@/main/factories/usecases';
import { makeEmailValidatorAdapter } from '@/main/factories/utils';
import { SignUpController } from '@/presentation/controllers';
import { Controller, Validator } from '@/presentation/interfaces';
import { ValidatorComposite, ValidatorBuilder } from '@/validation/validators';

export const makeSignUpController = (): Controller =>
  makeLogControllerDecorator(
    new SignUpController(makeEmailValidatorAdapter(), makeAddAccount(), makeSignUpValidator()),
  );

export const makeSignUpValidator = (): Validator =>
  new ValidatorComposite([
    ...ValidatorBuilder.field('name').required().build(),
    ...ValidatorBuilder.field('email').required().email().build(),
    ...ValidatorBuilder.field('password').required().build(),
    ...ValidatorBuilder.field('passwordConfirmation').sameAs('password').build(),
  ]);

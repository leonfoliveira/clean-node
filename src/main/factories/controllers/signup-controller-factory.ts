import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeAddAccount } from '@/main/factories/usecases';
import { makeEmailValidatorAdapter } from '@/main/factories/utils';
import { SignUpController } from '@/presentation/controllers';
import { Controller, Validation } from '@/presentation/interfaces';
import { RequiredFieldValidator, ValidationComposite } from '@/validation/validators';

export const makeSignUpController = (): Controller =>
  makeLogControllerDecorator(
    new SignUpController(makeEmailValidatorAdapter(), makeAddAccount(), makeSignUpValidation()),
  );

export const makeSignUpValidation = (): Validation =>
  new ValidationComposite([
    new RequiredFieldValidator('name'),
    new RequiredFieldValidator('email'),
    new RequiredFieldValidator('password'),
    new RequiredFieldValidator('passwordConfirmation'),
  ]);

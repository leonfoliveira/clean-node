import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeAddAccount } from '@/main/factories/usecases';
import { makeEmailValidatorAdapter } from '@/main/factories/utils';
import { SignUpController } from '@/presentation/controllers';
import { Controller } from '@/presentation/interfaces';

export const makeSignUpController = (): Controller =>
  makeLogControllerDecorator(new SignUpController(makeEmailValidatorAdapter(), makeAddAccount()));

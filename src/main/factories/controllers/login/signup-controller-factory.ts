import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeAddAccount, makeAuthentication } from '@/main/factories/usecases';
import { SignUpController } from '@/presentation/controllers';
import { Controller } from '@/presentation/interfaces';

export const makeSignUpController = (): Controller =>
  makeLogControllerDecorator(new SignUpController(makeAddAccount(), makeAuthentication()));

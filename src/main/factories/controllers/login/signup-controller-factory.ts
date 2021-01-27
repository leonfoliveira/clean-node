import { makeAddAccount, makeAuthentication } from '@/main/factories/usecases';
import { makeLogControllerDecorator } from '@/main/factories/utils';
import { SignUpController } from '@/presentation/controllers';
import { Controller } from '@/presentation/interfaces';

export const makeSignUpController = (): Controller =>
  makeLogControllerDecorator(new SignUpController(makeAddAccount(), makeAuthentication()));

import { makeAddAccount, makeAuthentication } from '@/main/factories/usecases';
import { makeLogControllerDecorator, makeValidationControllerProxy } from '@/main/factories/utils';
import { makeSignUpValidator } from '@/main/factories/validators';
import { SignUpController } from '@/presentation/controllers';
import { Controller } from '@/presentation/interfaces';

export const makeSignUpController = (): Controller =>
  makeValidationControllerProxy(
    makeSignUpValidator(),
    makeLogControllerDecorator(new SignUpController(makeAddAccount(), makeAuthentication())),
  );

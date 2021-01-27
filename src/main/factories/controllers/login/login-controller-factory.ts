import { makeAuthentication } from '@/main/factories/usecases';
import { makeLogControllerDecorator, makeValidationControllerProxy } from '@/main/factories/utils';
import { makeLoginValidator } from '@/main/factories/validators';
import { LoginController } from '@/presentation/controllers';
import { Controller } from '@/presentation/interfaces';

export const makeLoginController = (): Controller =>
  makeValidationControllerProxy(
    makeLoginValidator(),
    makeLogControllerDecorator(new LoginController(makeAuthentication())),
  );

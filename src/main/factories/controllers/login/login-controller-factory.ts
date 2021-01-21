import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeAuthentication } from '@/main/factories/usecases';
import { LoginController } from '@/presentation/controllers';
import { Controller } from '@/presentation/interfaces';

export const makeLoginController = (): Controller =>
  makeLogControllerDecorator(new LoginController(makeAuthentication()));

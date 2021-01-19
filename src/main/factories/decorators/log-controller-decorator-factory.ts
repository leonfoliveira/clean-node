import { LogControllerDecorator } from '@/main/decorators';
import { makeLogErrorRepository } from '@/main/factories/infras';
import { Controller } from '@/presentation/interfaces';

export const makeLogControllerDecorator = (controller: Controller): LogControllerDecorator =>
  new LogControllerDecorator(controller, makeLogErrorRepository());

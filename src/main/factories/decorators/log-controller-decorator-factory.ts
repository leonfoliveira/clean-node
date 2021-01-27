import { makeLogErrorRepository } from '@/main/factories/infras';
import { LogControllerDecorator } from '@/main/utils';
import { Controller } from '@/presentation/interfaces';

export const makeLogControllerDecorator = (controller: Controller): LogControllerDecorator =>
  new LogControllerDecorator(controller, makeLogErrorRepository());

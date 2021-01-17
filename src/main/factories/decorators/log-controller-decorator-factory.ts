import { LogControllerDecorator } from '@/main/decorators';
import { makeLogErrorRepository } from '@/main/factories/db';
import { Controller } from '@/presentation/interfaces';

export const makeLogControllerDecorator = (controller: Controller): LogControllerDecorator =>
  new LogControllerDecorator(controller, makeLogErrorRepository());

import { LogControllerDecorator } from '@/main/decorators';
import { makeLogRepository } from '@/main/factories/db';
import { Controller } from '@/presentation/interfaces';

export const makeLogControllerDecorator = (controller: Controller): LogControllerDecorator =>
  new LogControllerDecorator(controller, makeLogRepository());

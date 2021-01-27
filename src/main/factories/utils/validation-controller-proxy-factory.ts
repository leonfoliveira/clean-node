import { Validator } from '@/data/interfaces';
import { ValidationControllerProxy } from '@/main/utils';
import { Controller } from '@/presentation/interfaces';

export const makeValidationControllerProxy = (
  validator: Validator,
  controller: Controller,
): ValidationControllerProxy => new ValidationControllerProxy(validator, controller);

import Joi from 'joi';

import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeAuthentication } from '@/main/factories/usecases';
import { LoginController } from '@/presentation/controllers';
import { Controller } from '@/presentation/interfaces';

import { makeValidator } from '../../validation';

const validatorSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(32).required(),
});

export const makeLoginController = (): Controller =>
  makeLogControllerDecorator(
    new LoginController(makeValidator(validatorSchema), makeAuthentication()),
  );

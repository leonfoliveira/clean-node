import Joi from 'joi';

import { Validator } from '@/data/interfaces';
import { JoiAdapter } from '@/infra';

export const makeSignUpValidator = (): Validator =>
  new JoiAdapter(
    Joi.object({
      name: Joi.string().max(50).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(32).required(),
      passwordConfirmation: Joi.string().equal(Joi.ref('password')).required(),
    }).unknown(),
  );

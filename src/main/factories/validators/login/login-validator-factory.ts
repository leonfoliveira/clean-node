import Joi from 'joi';

import { Validator } from '@/data/interfaces';
import { JoiAdapter } from '@/infra';

export const makeLoginValidator = (): Validator =>
  new JoiAdapter(
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(32).required(),
    }).unknown(),
  );

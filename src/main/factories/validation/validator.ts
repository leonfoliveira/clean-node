import Joi from 'joi';

import { Validator } from '@/presentation/interfaces';
import { JoiValidatorAdapter } from '@/validation';

export const makeValidator = (schema: Joi.Schema): Validator => new JoiValidatorAdapter(schema);

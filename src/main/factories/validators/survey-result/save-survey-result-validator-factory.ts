import Joi from 'joi';

import { Validator } from '@/data/interfaces';
import { JoiAdapter } from '@/infra';

export const makeSaveSurveyResultValidator = (): Validator =>
  new JoiAdapter(
    Joi.object({
      answer: Joi.string().required(),
    }).unknown(),
  );

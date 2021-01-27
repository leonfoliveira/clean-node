import Joi from 'joi';

import { Validator } from '@/data/interfaces';
import { JoiAdapter } from '@/infra';

export const makeAddSurveyValidator = (): Validator =>
  new JoiAdapter(
    Joi.object({
      question: Joi.string().max(100).required(),
      answers: Joi.array()
        .items(
          Joi.object().keys({
            answer: Joi.string().max(100).required(),
            image: Joi.string().uri().optional(),
          }),
        )
        .required(),
    }).unknown(),
  );

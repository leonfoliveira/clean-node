import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { makeSurveyController } from '@/main/factories/controllers';

export default (router: Router): void => {
  router.post(
    '/surveys',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        question: Joi.string().max(100).required(),
        answers: Joi.array()
          .items(
            Joi.object().keys({
              answer: Joi.string().max(100).required(),
              image: Joi.string().uri().optional(),
            }),
          )
          .required(),
      }),
    }),
    adaptRoute(makeSurveyController()),
  );
};

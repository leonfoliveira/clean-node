import { celebrate, Segments, Joi } from 'celebrate';
import { RequestHandler } from 'express';

export const validateAddSurvey = (): RequestHandler =>
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
  });

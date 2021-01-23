import { celebrate, Segments, Joi } from 'celebrate';
import { RequestHandler } from 'express';

export const validateSaveSurveyResult = (): RequestHandler =>
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      answer: Joi.string().required(),
    }),
  });

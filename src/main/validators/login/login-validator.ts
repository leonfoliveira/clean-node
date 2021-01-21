import { celebrate, Segments, Joi } from 'celebrate';
import { RequestHandler } from 'express';

export const validateLogin = (): RequestHandler =>
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(32).required(),
    }),
  });

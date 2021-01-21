import { celebrate, Segments, Joi } from 'celebrate';
import { RequestHandler } from 'express';

export const validateSignUp = (): RequestHandler =>
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().max(50).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(32).required(),
      passwordConfirmation: Joi.string().equal(Joi.ref('password')).required(),
    }),
  });

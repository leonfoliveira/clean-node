import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { makeLoginController, makeSignUpController } from '@/main/factories/controllers';

export default (router: Router): void => {
  router.post(
    '/signup',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(32).required(),
        passwordConfirmation: Joi.string().equal(Joi.ref('password')).required(),
      }),
    }),
    adaptRoute(makeSignUpController()),
  );
  router.post(
    '/login',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(32).required(),
      }),
    }),
    adaptRoute(makeLoginController()),
  );
};

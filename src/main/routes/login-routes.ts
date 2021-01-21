import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { makeLoginController, makeSignUpController } from '@/main/factories/controllers';
import { validateSignUp, validateLogin } from '@/main/validators';

export default (router: Router): void => {
  router.post('/signup', validateSignUp(), adaptRoute(makeSignUpController()));
  router.post('/login', validateLogin(), adaptRoute(makeLoginController()));
};

import { Router } from 'express';

import { adaptMiddleware, adaptRoute } from '@/main/adapters';
import { makeAddSurveyController } from '@/main/factories/controllers';
import { makeAuthMiddleware } from '@/main/factories/middlewares';
import { validateAddSurvey } from '@/main/validators';

export default (router: Router): void => {
  router.post(
    '/surveys',
    validateAddSurvey(),
    adaptMiddleware(makeAuthMiddleware('admin')),
    adaptRoute(makeAddSurveyController()),
  );
};

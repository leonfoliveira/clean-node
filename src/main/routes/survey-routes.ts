import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { makeAddSurveyController, makeLoadSurveysController } from '@/main/factories/controllers';
import { authenticateAdmin, authenticateUser } from '@/main/middlewares';
import { validateAddSurvey } from '@/main/validators';

export default (router: Router): void => {
  router.post(
    '/surveys',
    authenticateAdmin(),
    validateAddSurvey(),
    adaptRoute(makeAddSurveyController()),
  );

  router.get('/surveys', authenticateUser(), adaptRoute(makeLoadSurveysController()));
};

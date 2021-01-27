import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { makeAddSurveyController, makeLoadSurveysController } from '@/main/factories/controllers';
import { authenticateAdmin, authenticateUser } from '@/main/middlewares';

export default (router: Router): void => {
  router.post('/surveys', authenticateAdmin(), adaptRoute(makeAddSurveyController()));

  router.get('/surveys', authenticateUser(), adaptRoute(makeLoadSurveysController()));
};

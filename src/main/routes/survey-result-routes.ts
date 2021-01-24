import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import {
  makeSaveSurveyResultController,
  makeLoadSurveyResultController,
} from '@/main/factories/controllers';
import { authenticateUser } from '@/main/middlewares';
import { validateSaveSurveyResult } from '@/main/validators';

export default (router: Router): void => {
  router.put(
    '/surveys/:surveyId/results',
    authenticateUser(),
    validateSaveSurveyResult(),
    adaptRoute(makeSaveSurveyResultController()),
  );

  router.get(
    '/surveys/:surveyId/results',
    authenticateUser(),
    adaptRoute(makeLoadSurveyResultController()),
  );
};

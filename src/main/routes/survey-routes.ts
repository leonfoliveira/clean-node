import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { makeAddSurveyController } from '@/main/factories/controllers';
import { validateAddSurvey } from '@/main/validators';

export default (router: Router): void => {
  router.post('/surveys', validateAddSurvey(), adaptRoute(makeAddSurveyController()));
};

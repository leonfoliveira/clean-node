import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { makeSurveyController } from '@/main/factories/controllers';

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeSurveyController()));
};

import faker from 'faker';

import { LoadSurveyResultController } from '@/presentation/controllers';

export const mockLoadSurveyResultRequest = (): LoadSurveyResultController.Request => ({
  surveyId: faker.random.uuid(),
  accountId: faker.random.uuid(),
});

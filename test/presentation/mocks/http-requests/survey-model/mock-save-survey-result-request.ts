import faker from 'faker';

import { SaveSurveyResultController } from '@/presentation/controllers';

export const mockSaveSurveyResultRequest = (): SaveSurveyResultController.Request => ({
  surveyId: faker.random.uuid(),
  accountId: faker.random.uuid(),
  answer: faker.random.words(),
});

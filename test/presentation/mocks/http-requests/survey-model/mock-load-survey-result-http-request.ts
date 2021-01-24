import faker from 'faker';

import { HttpRequest } from '@/presentation/interfaces';

export const mockLoadSurveyResultHttpRequest = (): HttpRequest => ({
  params: {
    surveyId: faker.random.uuid(),
  },
  headers: {
    accountId: faker.random.uuid(),
  },
});
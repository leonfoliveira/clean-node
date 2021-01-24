import faker from 'faker';

import { HttpRequest } from '@/presentation/interfaces';

export const mockSaveSurveyResultHttpRequest = (): HttpRequest => ({
  params: {
    surveyId: faker.random.uuid(),
  },
  headers: {
    accountId: faker.random.uuid(),
  },
  body: {
    answer: faker.random.words(),
  },
});

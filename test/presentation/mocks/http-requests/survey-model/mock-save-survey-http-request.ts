import faker from 'faker';

import { HttpRequest } from '@/presentation/interfaces';

export const mockSaveSurveyHttpRequest = (): HttpRequest => ({
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

import faker from 'faker';

import { HttpRequest } from '@/presentation/interfaces';

export const mockSaveSurveyHttpRequest = (): HttpRequest => ({
  params: {
    surveyId: faker.random.uuid(),
  },
});

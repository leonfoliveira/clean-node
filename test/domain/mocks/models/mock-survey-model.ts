import faker from 'faker';

import { SurveyModel } from '@/domain/models';

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.random.uuid(),
  question: faker.random.words(),
  answers: [
    {
      answer: faker.random.words(),
    },
    {
      image: faker.internet.url(),
      answer: faker.random.words(),
    },
  ],
});

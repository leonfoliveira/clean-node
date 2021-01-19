import faker from 'faker';

import { HttpRequest } from '@/presentation/interfaces';

export const mockAddSurveyHttpRequest = (): HttpRequest => ({
  body: {
    question: faker.random.words(),
    answers: [
      {
        image: faker.internet.url(),
        answer: faker.random.words(),
      },
    ],
  },
});

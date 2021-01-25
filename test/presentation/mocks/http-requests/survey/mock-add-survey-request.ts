import faker from 'faker';

import { AddSurveyController } from '@/presentation/controllers';

export const mockAddSurveyRequest = (): AddSurveyController.Request => ({
  question: faker.random.words(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.words(),
    },
  ],
});

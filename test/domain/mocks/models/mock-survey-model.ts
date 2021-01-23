import faker from 'faker';

import { SurveyModel, SurveyResultModel } from '@/domain/models';

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
  date: faker.date.past(),
});

export const mockSurveyResultModel = (): SurveyResultModel => ({
  id: faker.random.uuid(),
  question: faker.random.words(),
  answers: [
    {
      answer: faker.random.words(),
      count: faker.random.number(),
      percent: faker.random.number(100),
    },
    {
      image: faker.internet.url(),
      answer: faker.random.words(),
      count: faker.random.number(),
      percent: faker.random.number(100),
    },
  ],
  date: faker.date.past(),
});

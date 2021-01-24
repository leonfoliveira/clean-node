import faker from 'faker';

import { SurveyModel, SurveyResultModel } from '@/domain/models';
import { generateStringDifferent } from '@/test/helpers';

export const mockSurveyModel = (): SurveyModel => {
  const answer = faker.random.words();
  return {
    id: faker.random.uuid(),
    question: faker.random.words(),
    answers: [
      {
        answer,
      },
      {
        image: faker.internet.url(),
        answer: generateStringDifferent(answer),
      },
      {
        image: faker.internet.url(),
        answer: generateStringDifferent(generateStringDifferent(answer)),
      },
    ],
    date: faker.date.past(),
  };
};

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

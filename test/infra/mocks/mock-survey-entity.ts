import faker from 'faker';

import { generateStringDifferent } from '@/test/helpers';

export const mockSurveyEntity = (): any => {
  const answer = faker.random.words();
  return {
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

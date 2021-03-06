import faker from 'faker';

import { AddSurveyRepository } from '@/data/interfaces';
import { SurveyModel } from '@/domain/models';
import { mockSurveyModel } from '@/test/domain/mocks/models';
import { generateStringDifferent } from '@/test/helpers';

export const mockAddSurveyRepositoryParams = (): any => {
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

export class AddSurveyRepositoryStub implements AddSurveyRepository {
  response = mockSurveyModel();

  async add(): Promise<SurveyModel> {
    return this.response;
  }
}

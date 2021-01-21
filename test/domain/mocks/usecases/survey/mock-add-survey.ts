import faker from 'faker';

import { SurveyModel } from '@/domain/models';
import { AddSurvey, AddSurveyDTO } from '@/domain/usecases';
import { mockSurveyModel } from '@/test/domain/mocks/models';

export const mockAddSurveyDTO = (): AddSurveyDTO => ({
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
  date: new Date(),
});

export class AddSurveyStub implements AddSurvey {
  response = mockSurveyModel();

  async add(): Promise<SurveyModel> {
    return this.response;
  }
}

import faker from 'faker';

import { SaveSurveyResultRepository } from '@/data/interfaces';
import { mockSurveyResultModel } from '@/test/domain/mocks/models';

export const mockSaveSurveyResultRepositoryParams = ({
  surveyId = faker.random.uuid(),
  accountId = faker.random.uuid(),
  answer = faker.random.words(),
}: {
  surveyId?: string;
  accountId?: string;
  answer?: string;
} = {}): SaveSurveyResultRepository.Params => ({
  surveyId,
  accountId,
  answer,
  date: faker.date.past(),
});

export class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
  response = mockSurveyResultModel();

  async save(): Promise<void> {
    return null;
  }
}

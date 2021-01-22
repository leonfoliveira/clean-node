import faker from 'faker';

import { SurveyResultModel } from '@/domain/models';
import { SaveSurveyResult, SaveSurveyResultDTO } from '@/domain/usecases';
import { mockSurveyResultModel } from '@/test/domain/mocks/models';

export const mockSaveSurveyResultDTO = (): SaveSurveyResultDTO => ({
  surveyId: faker.random.uuid(),
  accountId: faker.random.uuid(),
  answer: faker.random.words(),
  date: faker.date.past(),
});

export class SaveSurveyResultStub implements SaveSurveyResult {
  response = mockSurveyResultModel();

  async save(): Promise<SurveyResultModel> {
    return this.response;
  }
}

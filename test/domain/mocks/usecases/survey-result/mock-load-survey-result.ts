import faker from 'faker';

import { SurveyResultModel } from '@/domain/models';
import { LoadSurveyResult, LoadSurveyResultDTO } from '@/domain/usecases';
import { mockSurveyResultModel } from '@/test/domain/mocks/models';

export const mockLoadSurveyResultDTO = (): LoadSurveyResultDTO => ({
  surveyId: faker.random.uuid(),
  accountId: faker.random.uuid(),
});

export class LoadSurveyResultStub implements LoadSurveyResult {
  response = mockSurveyResultModel();

  async load(): Promise<SurveyResultModel> {
    return this.response;
  }
}

import faker from 'faker';

import { SurveyModel } from '@/domain/models';
import { LoadSurveys, LoadSurveysDTO } from '@/domain/usecases';
import { mockSurveyModel } from '@/test/domain/mocks/models';

export const mockLoadSurveysDTO = (): LoadSurveysDTO => ({
  accountId: faker.random.uuid(),
});

export class LoadSurveysStub implements LoadSurveys {
  response = [mockSurveyModel(), mockSurveyModel()];

  async loadAll(): Promise<SurveyModel[]> {
    return this.response;
  }
}

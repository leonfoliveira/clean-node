import faker from 'faker';

import { SurveyModel } from '@/domain/models';
import { LoadSurveyById, LoadSurveyByIdDTO } from '@/domain/usecases';
import { mockSurveyModel } from '@/test/domain/mocks/models';

export const mockLoadSurveyByIdDTO = (): LoadSurveyByIdDTO => ({
  id: faker.random.uuid(),
});

export class LoadSurveyByIdStub implements LoadSurveyById {
  response = mockSurveyModel();

  async loadById(): Promise<SurveyModel> {
    return this.response;
  }
}

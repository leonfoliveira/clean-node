import { LoadSurveyByIdRepository } from '@/data/interfaces';
import { SurveyModel } from '@/domain/models';
import { mockSurveyModel } from '@/test/domain/mocks/models';

export class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
  response = mockSurveyModel();

  async loadById(): Promise<SurveyModel> {
    return this.response;
  }
}

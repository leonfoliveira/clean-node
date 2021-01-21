import { LoadSurveysRepository } from '@/data/interfaces';
import { SurveyModel } from '@/domain/models';
import { mockSurveyModel } from '@/test/domain/mocks/models';

export class LoadSurveysRepositoryStub implements LoadSurveysRepository {
  response = [mockSurveyModel(), mockSurveyModel()];

  async loadAll(): Promise<SurveyModel[]> {
    return this.response;
  }
}

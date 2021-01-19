import { AddSurveyRepository } from '@/data/interfaces';
import { SurveyModel } from '@/domain/models';
import { mockSurveyModel } from '@/test/domain/mocks/models';

export class AddSurveyRepositoryStub implements AddSurveyRepository {
  response = mockSurveyModel();

  async add(): Promise<SurveyModel> {
    return this.response;
  }
}

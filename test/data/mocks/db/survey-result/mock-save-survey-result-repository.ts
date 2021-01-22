import { SaveSurveyResultRepository } from '@/data/interfaces';
import { SurveyResultModel } from '@/domain/models';
import { mockSurveyResultModel } from '@/test/domain/mocks/models';

export class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
  response = mockSurveyResultModel();

  async save(): Promise<SurveyResultModel> {
    return this.response;
  }
}

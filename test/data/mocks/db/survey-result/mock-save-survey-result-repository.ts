import { SaveSurveyResultRepository } from '@/data/interfaces';
import { mockSurveyResultModel } from '@/test/domain/mocks/models';

export class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
  response = mockSurveyResultModel();

  async save(): Promise<void> {
    return null;
  }
}

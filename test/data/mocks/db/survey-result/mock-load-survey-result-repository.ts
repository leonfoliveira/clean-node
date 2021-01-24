import { LoadSurveyResultRepository } from '@/data/interfaces/db/survey-result/load-survey-result-repository';
import { SurveyResultModel } from '@/domain/models';
import { mockSurveyResultModel } from '@/test/domain/mocks/models';

export class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
  result = mockSurveyResultModel();

  async loadBySurveyId(): Promise<SurveyResultModel> {
    return this.result;
  }
}

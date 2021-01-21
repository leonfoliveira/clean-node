import { SurveyModel } from '@/domain/models';
import { LoadSurveys } from '@/domain/usecases';
import { mockSurveyModel } from '@/test/domain/mocks/models';

export class LoadSurveysStub implements LoadSurveys {
  response = [mockSurveyModel(), mockSurveyModel()];

  async load(): Promise<SurveyModel[]> {
    return this.response;
  }
}

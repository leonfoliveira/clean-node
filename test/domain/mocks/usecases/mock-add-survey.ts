import { SurveyModel } from '@/domain/models';
import { AddSurvey } from '@/domain/usecases';
import { mockSurveyModel } from '@/test/domain/mocks/models';

export class AddSurveyStub implements AddSurvey {
  response = mockSurveyModel();

  async add(): Promise<SurveyModel> {
    return this.response;
  }
}

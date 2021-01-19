import { AddSurveyRepository } from '@/data/interfaces';
import { SurveyModel } from '@/domain/models';
import { AddSurvey, AddSurveyDTO } from '@/domain/usecases';

export class DbAddSurvey implements AddSurvey {
  constructor(private readonly addSurveyRepository: AddSurveyRepository) {}

  async add(params: AddSurveyDTO): Promise<SurveyModel> {
    await this.addSurveyRepository.add(params);
    return null;
  }
}

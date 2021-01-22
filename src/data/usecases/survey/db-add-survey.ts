import { AddSurveyRepository } from '@/data/interfaces';
import { SurveyModel } from '@/domain/models';
import { AddSurvey, AddSurveyDTO } from '@/domain/usecases';

export class DbAddSurvey implements AddSurvey {
  constructor(private readonly addSurveyRepository: AddSurveyRepository) {}

  async add(params: AddSurveyDTO): Promise<SurveyModel> {
    return this.addSurveyRepository.add(params);
  }
}

import { LoadSurveyByIdRepository } from '@/data/interfaces';
import { SurveyModel } from '@/domain/models';
import { LoadSurveyById, LoadSurveyByIdDTO } from '@/domain/usecases';

export class DbLoadSurveyById implements LoadSurveyById {
  constructor(private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}

  async loadById(params: LoadSurveyByIdDTO): Promise<SurveyModel> {
    await this.loadSurveyByIdRepository.loadById(params.id);
    return null;
  }
}

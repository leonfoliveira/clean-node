import { LoadSurveyByIdRepository, LoadSurveyResultRepository } from '@/data/interfaces';
import { SurveyResultModel } from '@/domain/models';
import { LoadSurveyResult, LoadSurveyResultDTO } from '@/domain/usecases';

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository,
  ) {}

  async load(params: LoadSurveyResultDTO): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      params.surveyId,
      params.accountId,
    );
    if (!surveyResult) {
      await this.loadSurveyByIdRepository.loadById(params.surveyId);
    }

    return surveyResult;
  }
}

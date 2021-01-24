import { LoadSurveyByIdRepository, LoadSurveyResultRepository } from '@/data/interfaces';
import { SurveyResultModel } from '@/domain/models';
import { LoadSurveyResult, LoadSurveyResultDTO } from '@/domain/usecases';

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository,
  ) {}

  async load(params: LoadSurveyResultDTO): Promise<SurveyResultModel> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      params.surveyId,
      params.accountId,
    );
    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(params.surveyId);
      surveyResult = {
        ...survey,
        answers: survey.answers.map((a) => ({
          ...a,
          count: 0,
          percent: 0,
          isCurrentAccountAnswerCount: false,
        })),
      };
    }

    return surveyResult;
  }
}

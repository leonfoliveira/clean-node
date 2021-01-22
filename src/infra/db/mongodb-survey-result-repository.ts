import { SaveSurveyResultRepository, SaveSurveyResultRepositoryParams } from '@/data/interfaces';
import { SurveyResultModel } from '@/domain/models';
import { MongoHelper } from '@/infra';

export class MongodbSurveyResultRepository implements SaveSurveyResultRepository {
  async save(params: SaveSurveyResultRepositoryParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults');
    const surveyResult = await surveyResultCollection.findOneAndUpdate(
      { surveyId: params.surveyId, accountId: params.accountId },
      { $set: params },
      { upsert: true, returnOriginal: false },
    );

    return surveyResult && MongoHelper.mapId(surveyResult.value);
  }
}

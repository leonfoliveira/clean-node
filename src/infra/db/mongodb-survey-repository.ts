import { AddSurveyRepository, AddSurveyRepositoryParams } from '@/data/interfaces';
import { SurveyModel } from '@/domain/models';
import { MongoHelper } from '@/infra';

export class MongodbSurveyRepository implements AddSurveyRepository {
  async add(params: AddSurveyRepositoryParams): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const result = await surveyCollection.insertOne(params);

    return MongoHelper.mapId(result.ops[0]);
  }
}

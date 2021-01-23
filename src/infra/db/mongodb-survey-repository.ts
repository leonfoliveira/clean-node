import { ObjectId } from 'mongodb';

import {
  AddSurveyRepository,
  AddSurveyRepositoryParams,
  LoadSurveysRepository,
  LoadSurveyByIdRepository,
} from '@/data/interfaces';
import { SurveyModel } from '@/domain/models';
import { MongoHelper } from '@/infra';

export class MongodbSurveyRepository
  implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add(params: AddSurveyRepositoryParams): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survey = await surveyCollection.insertOne(params);

    return survey && MongoHelper.mapId(survey.ops[0]);
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const surveys = await surveyCollection.find().toArray();

    return surveys.map((survey) => MongoHelper.mapId(survey));
  }

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) });

    return survey && MongoHelper.mapId(survey);
  }
}

import { ObjectId } from 'mongodb';

import {
  AddSurveyRepository,
  AddSurveyRepositoryParams,
  LoadSurveysRepository,
  LoadSurveyByIdRepository,
} from '@/data/interfaces';
import { SurveyModel } from '@/domain/models';
import { MongoHelper, MongodbQueryBuilder } from '@/infra';

export class MongodbSurveyRepository
  implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add(params: AddSurveyRepositoryParams): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survey = await surveyCollection.insertOne(params);

    return survey && MongoHelper.mapId(survey.ops[0]);
  }

  async loadAll(accountId: string): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const query = new MongodbQueryBuilder()
      .lookup({
        from: 'surveyResults',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result',
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [
            {
              $size: {
                $filter: {
                  input: '$result',
                  as: 'item',
                  cond: {
                    $eq: ['$$item.accountId', new ObjectId(accountId)],
                  },
                },
              },
            },
            1,
          ],
        },
      })
      .build();
    const surveys = await surveyCollection.aggregate(query).toArray();

    return surveys.map((survey) => MongoHelper.mapId(survey));
  }

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) });

    return survey && MongoHelper.mapId(survey);
  }
}

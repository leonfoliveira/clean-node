import { Collection } from 'mongodb';

import { MongodbSurveyRepository, MongoHelper } from '@/infra';
import { mockSurveyModel } from '@/test/domain/mocks/models';

const makeSut = (): MongodbSurveyRepository => new MongodbSurveyRepository();

describe('MongodbSurveyRepository', () => {
  let surveyCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
  });

  it('should return a SurveyModel on add success', async () => {
    const sut = makeSut();
    const survey = mockSurveyModel();

    const result = await sut.add(survey);

    expect(result).toBeTruthy();
    expect(result.id).toBeTruthy();
    expect(result.question).toBe(survey.question);
    expect(result.answers).toEqual(survey.answers);
  });
});

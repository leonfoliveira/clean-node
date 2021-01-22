import { Collection } from 'mongodb';

import { MongodbSurveyResultRepository, MongoHelper } from '@/infra';
import { mockSurveyResultModel } from '@/test/domain/mocks/models';

const makeSut = (): MongodbSurveyResultRepository => new MongodbSurveyResultRepository();

describe('MongodbSurveyResultRepository', () => {
  let surveyCollection: Collection;
  let surveyResultCollection: Collection;
  let accountCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
    surveyResultCollection = await MongoHelper.getCollection('surveyResults');
    await surveyResultCollection.deleteMany({});
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('SaveSurveyResultRepository', () => {
    it('should create a SurveyResult if its new', async () => {
      const sut = makeSut();
      const params = mockSurveyResultModel();
      delete params.id;

      const result = await sut.save(params);

      expect(result).toBeTruthy();
      expect(result.id).toBeTruthy();
      expect(result.surveyId).toBe(params.surveyId);
      expect(result.accountId).toBe(params.accountId);
      expect(result.answer).toEqual(params.answer);
      expect(result.date).toEqual(params.date);
    });
  });

  it('should update SurveyResult if its not new', async () => {
    const sut = makeSut();
    const params = mockSurveyResultModel();
    delete params.id;
    const id = (await surveyResultCollection.insertOne(params)).ops[0]._id;

    const result = await sut.save(params);

    expect(result).toBeTruthy();
    expect(result.id).toEqual(id);
    expect(result.surveyId).toBe(params.surveyId);
    expect(result.accountId).toBe(params.accountId);
    expect(result.answer).toEqual(params.answer);
    expect(result.date).toEqual(params.date);
  });
});

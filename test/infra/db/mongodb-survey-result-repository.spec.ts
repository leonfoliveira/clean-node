import { AccountModel, SurveyModel } from 'domain/models';

import { Collection, ObjectId } from 'mongodb';

import { MongodbSurveyResultRepository, MongoHelper } from '@/infra';
import { mockAccountModel, mockSurveyModel } from '@/test/domain/mocks/models';
import { mockSaveSurveyResultDTO } from '@/test/domain/mocks/usecases';

const makeSut = (): MongodbSurveyResultRepository => new MongodbSurveyResultRepository();

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const mockSurvey = async (): Promise<SurveyModel> => {
  const params = mockSurveyModel();
  delete params.id;
  return MongoHelper.mapId((await surveyCollection.insertOne(params)).ops[0]);
};

const mockAccount = async (): Promise<AccountModel> => {
  const params = mockAccountModel();
  delete params.id;
  return MongoHelper.mapId((await accountCollection.insertOne(params)).ops[0]);
};

describe('MongodbSurveyResultRepository', () => {
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
      const params = mockSaveSurveyResultDTO();
      const survey = await mockSurvey();
      params.surveyId = survey.id;
      params.accountId = (await mockAccount()).id;
      params.answer = survey.answers[0].answer;

      await sut.save(params);

      const surveyResult = await surveyResultCollection.findOne({
        surveyId: params.surveyId,
        accountId: params.accountId,
      });
      expect(surveyResult).toBeTruthy();
    });

    it('should update SurveyResult if its not new', async () => {
      const sut = makeSut();
      const params = mockSaveSurveyResultDTO();
      const survey = await mockSurvey();
      params.surveyId = survey.id;
      params.accountId = (await mockAccount()).id;
      params.answer = survey.answers[1].answer;
      await surveyResultCollection.insertOne({
        ...params,
        surveyId: new ObjectId(params.surveyId),
        accountId: new ObjectId(params.accountId),
      });

      await sut.save(params);

      const surveyResult = await surveyResultCollection
        .find({
          surveyId: params.surveyId,
          accountId: params.accountId,
        })
        .toArray();
      expect(surveyResult).toHaveLength(1);
    });
  });

  describe('LoadSurveyResultRepository', () => {
    it('should return a SurveyResult on success', async () => {
      const sut = makeSut();
      const survey = await mockSurvey();
      const accountId = (await mockAccount()).id;
      await surveyResultCollection.insertMany([
        {
          surveyId: survey.id,
          accountId,
          answer: survey.answers[0].answer,
          date: new Date(),
        },
        {
          surveyId: survey.id,
          accountId,
          answer: survey.answers[0].answer,
          date: new Date(),
        },
        {
          surveyId: survey.id,
          accountId,
          answer: survey.answers[1].answer,
          date: new Date(),
        },
        {
          surveyId: survey.id,
          accountId,
          answer: survey.answers[0].answer,
          date: new Date(),
        },
      ]);

      const result = await sut.loadBySurveyId(survey.id, accountId);

      expect(result).toBeTruthy();
      expect(result.id).toEqual(survey.id);
      expect(result.question).toEqual(survey.question);
      expect(result.answers[0].count).toBe(3);
      expect(result.answers[0].percent).toBe(75);
      expect(result.answers[1].count).toBe(1);
      expect(result.answers[1].percent).toBe(25);
      expect(result.answers[2].count).toBe(0);
      expect(result.answers[2].percent).toBe(0);
      expect(result.date).toEqual(survey.date);
    });
  });
});

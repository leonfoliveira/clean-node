import { Collection, ObjectId } from 'mongodb';

import { MongodbSurveyResultRepository, MongoHelper } from '@/infra';
import { mockSaveSurveyResultRepositoryParams } from '@/test/data/mocks';
import {
  mockAccountEntity,
  mockSaveSurveyResultEntity,
  mockSurveyEntity,
} from '@/test/infra/mocks';

const makeSut = (): MongodbSurveyResultRepository => new MongodbSurveyResultRepository();

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const createSurvey = async (): Promise<any> => {
  const survey = mockSurveyEntity();
  return (await surveyCollection.insertOne(survey)).ops[0];
};

const createAccount = async (): Promise<any> => {
  const account = mockAccountEntity();
  return (await accountCollection.insertOne(account)).ops[0];
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
      const survey = await createSurvey();
      const account = await createAccount();
      const params = mockSaveSurveyResultRepositoryParams({
        surveyId: survey._id,
        accountId: account._id,
        answer: survey.answers[0].answer,
      });

      await sut.save(params);

      const surveyResult = await surveyResultCollection.findOne({
        surveyId: params.surveyId,
        accountId: params.accountId,
      });
      expect(surveyResult).toBeTruthy();
    });

    it('should update SurveyResult if its not new', async () => {
      const sut = makeSut();
      const survey = await createSurvey();
      const account = await createAccount();
      const params = mockSaveSurveyResultRepositoryParams({
        surveyId: survey._id,
        accountId: account._id,
        answer: survey.answers[1].answer,
      });
      await surveyResultCollection.insertOne(
        mockSaveSurveyResultEntity({
          surveyId: new ObjectId(survey._id),
          accountId: new ObjectId(account._id),
          answer: survey.answers[1].answer,
        }),
      );

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
      const survey = await createSurvey();
      const account = await createAccount();
      await surveyResultCollection.insertMany([
        mockSaveSurveyResultEntity({
          surveyId: new ObjectId(survey._id),
          accountId: new ObjectId(account._id),
          answer: survey.answers[0].answer,
        }),
        mockSaveSurveyResultEntity({
          surveyId: new ObjectId(survey._id),
          accountId: new ObjectId(account._id),
          answer: survey.answers[0].answer,
        }),
        mockSaveSurveyResultEntity({
          surveyId: new ObjectId(survey._id),
          accountId: new ObjectId(account._id),
          answer: survey.answers[1].answer,
        }),
        mockSaveSurveyResultEntity({
          surveyId: new ObjectId(survey._id),
          accountId: new ObjectId(account._id),
          answer: survey.answers[0].answer,
        }),
      ]);

      const result = await sut.loadBySurveyId(survey._id, account._id);

      expect(result).toBeTruthy();
      expect(result.id).toEqual(survey._id);
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

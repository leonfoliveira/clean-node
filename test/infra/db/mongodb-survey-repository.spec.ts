import { Collection, ObjectId } from 'mongodb';

import { MongodbSurveyRepository, MongoHelper } from '@/infra';
import { mockAddSurveyRepositoryParams } from '@/test/data/mocks';
import {
  mockAccountEntity,
  mockSaveSurveyResultEntity,
  mockSurveyEntity,
} from '@/test/infra/mocks';

const makeSut = (): MongodbSurveyRepository => new MongodbSurveyRepository();

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const createAccount = async (): Promise<any> => {
  const account = mockAccountEntity();
  return MongoHelper.mapId((await accountCollection.insertOne(account)).ops[0]);
};

const createSurvey = async (): Promise<any> => {
  const survey = mockAccountEntity();
  return MongoHelper.mapId((await surveyCollection.insertOne(survey)).ops[0]);
};

describe('MongodbSurveyRepository', () => {
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

  describe('AddSurveyRepository', () => {
    it('should return a SurveyModel on add success', async () => {
      const sut = makeSut();
      const survey = mockAddSurveyRepositoryParams();

      const result = await sut.add(survey);

      expect(result).toBeTruthy();
      expect(result.id).toBeTruthy();
      expect(result.question).toBe(survey.question);
      expect(result.answers).toEqual(survey.answers);
    });
  });

  describe('LoadSurveysRepository', () => {
    it('should load all surveys on success', async () => {
      const sut = makeSut();
      const surveys = [mockSurveyEntity(), mockSurveyEntity()];
      const insertedSurveys = await surveyCollection.insertMany(surveys);
      const account = await createAccount();
      await surveyResultCollection.insertOne(
        mockSaveSurveyResultEntity({
          surveyId: insertedSurveys.ops[0]._id,
          accountId: new ObjectId(account.id),
          answer: insertedSurveys.ops[0].answers[0].answer,
        }),
      );

      const result = await sut.loadAll(account.id);

      expect(result[0].id).toBeTruthy();
      expect(result[0].question).toBe(surveys[0].question);
      expect(result[0].answers).toEqual(surveys[0].answers);
      expect(result[0].date).toEqual(surveys[0].date);
      expect(result[0].didAnswer).toBe(true);
      expect(result[1].id).toBeTruthy();
      expect(result[1].question).toBe(surveys[1].question);
      expect(result[1].answers).toEqual(surveys[1].answers);
      expect(result[1].date).toEqual(surveys[1].date);
      expect(result[1].didAnswer).toBe(false);
    });

    it('should load empty list', async () => {
      const sut = makeSut();
      const account = await createAccount();

      const result = await sut.loadAll(account.id);

      expect(result).toEqual([]);
    });
  });

  describe('LoadSurveyByIdRepository', () => {
    it('should load survey by id on success', async () => {
      const sut = makeSut();
      const survey = await createSurvey();

      const result = await sut.loadById(survey.id);

      expect(result.id).toBeTruthy();
      expect(result.question).toBe(survey.question);
      expect(result.answers).toEqual(survey.answers);
      expect(result.date).toEqual(survey.date);
    });
  });
});

import faker from 'faker';
import { Collection, ObjectId } from 'mongodb';

import { AccountModel } from '@/domain/models';
import { MongodbSurveyRepository, MongoHelper } from '@/infra';
import { mockAccountModel, mockSurveyModel } from '@/test/domain/mocks/models';
import { mockSaveSurveyResultDTO } from '@/test/domain/mocks/usecases';

const makeSut = (): MongodbSurveyRepository => new MongodbSurveyRepository();

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const mockAccount = async (): Promise<AccountModel> => {
  const params = mockAccountModel();
  delete params.id;
  return MongoHelper.mapId((await accountCollection.insertOne(params)).ops[0]);
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
      const survey = mockSurveyModel();

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
      const mockSurveyWithoutId = (): any => {
        const survey = mockSurveyModel();
        delete survey.id;
        return survey;
      };
      let surveys = [mockSurveyWithoutId(), mockSurveyWithoutId()];
      const insertedSurveys = await surveyCollection.insertMany(surveys);
      surveys = surveys.map((survey) => MongoHelper.mapId(survey));
      const account = await mockAccount();
      await surveyResultCollection.insertOne({
        ...mockSaveSurveyResultDTO(),
        surveyId: insertedSurveys.ops[0]._id,
        accountId: account.id,
        answer: insertedSurveys.ops[0].answers[0].answer,
      });

      const result = await sut.loadAll(account.id);

      surveys[0].didAnswer = true;
      surveys[1].didAnswer = false;
      expect(result).toEqual(surveys);
    });

    it('should load empty list', async () => {
      const sut = makeSut();
      const account = await mockAccount();

      const result = await sut.loadAll(account.id);

      expect(result).toEqual([]);
    });
  });

  describe('LoadSurveyByIdRepository', () => {
    it('should load survey by id on success', async () => {
      const sut = makeSut();
      const survey = mockSurveyModel();
      delete survey.id;
      const id = (await surveyCollection.insertOne({ ...survey })).ops[0]._id;

      const result = await sut.loadById(id);

      expect(result.id).toBeTruthy();
      expect(result.question).toBe(survey.question);
      expect(result.answers).toEqual(survey.answers);
      expect(result.date).toEqual(survey.date);
    });
  });
});

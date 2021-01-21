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
      await surveyCollection.insertMany(surveys);
      surveys = surveys.map((survey) => MongoHelper.mapId(survey));

      const result = await sut.loadAll();

      expect(result).toEqual(surveys);
    });
  });
});

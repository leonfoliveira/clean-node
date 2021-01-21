import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '@/infra';
import { app } from '@/main/config/app';
import { mockAddSurveyHttpRequest } from '@/test/presentation/mocks';

describe('SurveyRoutes', () => {
  let surveyCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('accounts');
    await surveyCollection.deleteMany({});
  });

  describe('POST /surveys', () => {
    it('should return 403 if no accessToken is provided', async () => {
      const httpResponse = await request(app)
        .post('/api/surveys')
        .send(mockAddSurveyHttpRequest().body);

      expect(httpResponse.status).toBe(403);
    });
  });
});

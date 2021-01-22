import request from 'supertest';

import { MongoHelper } from '@/infra';
import { app } from '@/main/config/app';
import { mockSaveSurveyHttpRequest } from '@/test/presentation/mocks';

describe('SurveyRoutes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe('PUT /surveys/:surveyId/results', () => {
    it('should return 403 if no accessToken is provided', async () => {
      const httpResponse = await request(app)
        .put('/api/surveys/any_id/results')
        .send(mockSaveSurveyHttpRequest().body);

      expect(httpResponse.status).toBe(403);
    });
  });
});

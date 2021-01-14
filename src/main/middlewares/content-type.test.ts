import request from 'supertest';

import { app } from '@/main/config/app';

describe('ContentTypeMiddleware', () => {
  it('should return default content type as json', async () => {
    app.get('/test-content-type', (req, res) => res.send());
    const response = await request(app).get('/test-content-type');

    expect(response.headers['content-type']).toMatch(/json/);
  });
});

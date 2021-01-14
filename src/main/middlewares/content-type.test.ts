import request from 'supertest';

import { app } from '@/main/config/app';

describe('ContentTypeMiddleware', () => {
  it('should return default content type as json', async () => {
    app.get('/test-content-type', (req, res) => res.send());
    const response = await request(app).get('/test-content-type');

    expect(response.headers['content-type']).toMatch(/json/);
  });

  it('should return xml content type when forced', async () => {
    app.get('/test-content-type-xml', (req, res) => {
      res.type('xml');
      res.send();
    });
    const response = await request(app).get('/test-content-type-xml');

    expect(response.headers['content-type']).toMatch(/xml/);
  });
});

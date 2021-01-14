import request from 'supertest';

import { app } from '@/main/config/app';

describe('CorsMiddleware', () => {
  it('should enable cors', async () => {
    app.get('/test-cors', (req, res) => res.send());
    const response = await request(app).get('/test-cors');

    expect(response.headers).toHaveProperty('access-control-allow-origin', '*');
    expect(response.headers).toHaveProperty('access-control-allow-methods', '*');
    expect(response.headers).toHaveProperty('access-control-allow-headers', '*');
  });
});

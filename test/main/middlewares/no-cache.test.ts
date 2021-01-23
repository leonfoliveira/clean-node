import request from 'supertest';

import { app } from '@/main/config/app';
import { noCache } from '@/main/middlewares';

describe('NoCacheMiddleware', () => {
  it('should disabel cache', async () => {
    app.get('/test-no-cache', noCache, (req, res) => res.send());
    const response = await request(app).get('/test-no-cache');

    expect(response.headers).toHaveProperty(
      'cache-control',
      'no-store, no-cache, must-revalidate, proxy-revalidate',
    );
    expect(response.headers).toHaveProperty('pragma', 'no-cache');
    expect(response.headers).toHaveProperty('expires', '0');
    expect(response.headers).toHaveProperty('surrogate-control', 'no-store');
  });
});

import faker from 'faker';
import request from 'supertest';

import { app } from '@/main/config/app';

describe('BodyParserMiddleware', () => {
  it('should parse body as JSON', async () => {
    app.post('/test-body-parser', (req, res) => res.send(req.body));
    const value = faker.random.word();

    const response = await request(app).post('/test-body-parser').send({ value });

    expect(response.body).toEqual({ value });
  });
});

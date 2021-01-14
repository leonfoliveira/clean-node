import faker from 'faker';
import request from 'supertest';

import { app } from '@/main/config/app';

describe('SignupRoutes', () => {
  it('should return an account on success', async () => {
    const password = faker.internet.password();
    const response = await request(app).post('/api/signup').send({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password,
    });

    expect(response.status).toBe(200);
  });
});

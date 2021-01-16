import faker from 'faker';

import { mockAuthenticationModel } from '@/domain/mocks';
import { AuthenticationModel } from '@/domain/models';
import { Authentication, AuthenticationDTO } from '@/domain/usecases';

export const mockAuthenticationDTO = (): AuthenticationDTO => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export class AuthenticationStub implements Authentication {
  response = mockAuthenticationModel();

  async auth(): Promise<AuthenticationModel> {
    return this.response;
  }
}

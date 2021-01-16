import faker from 'faker';

import { AuthorizationModel } from '@/domain/models';
import { Authentication, AuthenticationDTO } from '@/domain/usecases';
import { mockAuthorizationModel } from '@/test/domain/mocks';

export const mockAuthenticationDTO = (): AuthenticationDTO => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export class AuthenticationStub implements Authentication {
  response = mockAuthorizationModel();

  async auth(): Promise<AuthorizationModel> {
    return this.response;
  }
}

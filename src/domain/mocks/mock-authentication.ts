import faker from 'faker';

import { mockAuthorizationModel } from '@/domain/mocks';
import { AuthorizationModel } from '@/domain/models';
import { Authentication, AuthenticationDTO } from '@/domain/usecases';

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

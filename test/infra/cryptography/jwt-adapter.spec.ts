import faker from 'faker';
import jwt from 'jsonwebtoken';

import { JwtAdapter } from '@/infra/criptography/jwt-adapter';

jest.mock('jsonwebtoken', () => ({
  sign: async (): Promise<string> => faker.random.uuid(),
}));

describe('JwtAdapter', () => {
  it('should call jwt.sign with correct values', async () => {
    const secret = faker.random.word();
    const sut = new JwtAdapter(secret);
    const signSpy = jest.spyOn(jwt, 'sign');
    const id = faker.random.uuid();

    await sut.generate(id);

    expect(signSpy).toHaveBeenCalledWith({ id }, secret);
  });
});

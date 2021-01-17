import faker from 'faker';
import jwt from 'jsonwebtoken';

import { JwtAdapter } from '@/infra/criptography/jwt-adapter';

jest.mock('jsonwebtoken', () => ({
  sign: (): string => faker.random.uuid(),
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

  it('should return a token on sign success', async () => {
    const secret = faker.random.word();
    const sut = new JwtAdapter(secret);
    const id = faker.random.uuid();
    const accessToken = faker.random.uuid();
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => accessToken);

    const result = await sut.generate(id);

    expect(result).toBe(accessToken);
  });
});

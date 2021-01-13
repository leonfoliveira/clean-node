import faker from 'faker';

import { EncrypterStub } from '@/data/mocks';
import { mockAddAccountParams } from '@/presentation/mocks/mock-add-account';

import { DbAddAccount } from './db-add-account';

type SutTypes = {
  sut: DbAddAccount;
  encrypterStub: EncrypterStub;
};

const makeSut = (): SutTypes => {
  const encrypterStub = new EncrypterStub();
  const sut = new DbAddAccount(encrypterStub);

  return { sut, encrypterStub };
};

describe('DbAddAccount', () => {
  it('should call Encrypter with correct password', () => {
    const { sut, encrypterStub } = makeSut();
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = mockAddAccountParams();

    sut.add(accountData);

    expect(encrypterSpy).toHaveBeenCalledWith(accountData.password);
  });

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(error);
    const accountData = mockAddAccountParams();

    const promise = sut.add(accountData);

    await expect(promise).rejects.toThrow(error);
  });
});

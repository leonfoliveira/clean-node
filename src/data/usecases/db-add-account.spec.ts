import faker from 'faker';

import { AddAccountRepositoryStub, EncrypterStub } from '@/data/mocks';
import { mockAddAccountParams } from '@/presentation/mocks/mock-add-account';

import { DbAddAccount } from './db-add-account';

type SutTypes = {
  sut: DbAddAccount;
  encrypterStub: EncrypterStub;
  addAccountRepositoryStub: AddAccountRepositoryStub;
};

const makeSut = (): SutTypes => {
  const encrypterStub = new EncrypterStub();
  const addAccountRepositoryStub = new AddAccountRepositoryStub();
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);

  return { sut, encrypterStub, addAccountRepositoryStub };
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

    const promise = sut.add(mockAddAccountParams());

    await expect(promise).rejects.toThrow(error);
  });

  it('should call AddAccountRepository with correct values', async () => {
    const { sut, encrypterStub, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    const accountData = mockAddAccountParams();

    await sut.add(accountData);

    expect(addSpy).toHaveBeenCalledWith({
      ...accountData,
      password: encrypterStub.response,
    });
  });

  it('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(error);

    const promise = sut.add(mockAddAccountParams());

    await expect(promise).rejects.toThrow(error);
  });

  it('should return an AccountModel on success', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    const account = await sut.add(mockAddAccountParams());

    expect(account).toEqual(addAccountRepositoryStub.response);
  });
});

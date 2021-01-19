import faker from 'faker';

import { DbAddAccount } from '@/data/usecases';
import {
  HashGeneratorStub,
  AddAccountRepositoryStub,
  LoadAccountByEmailRepositoryStub,
} from '@/test/data/mocks';
import { mockAccountModel } from '@/test/domain/mocks/models';
import { mockAddAccountDTO } from '@/test/domain/mocks/usecases';

type SutTypes = {
  sut: DbAddAccount;
  hashGeneratorStub: HashGeneratorStub;
  addAccountRepositoryStub: AddAccountRepositoryStub;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepositoryStub;
};

const makeSut = (): SutTypes => {
  const hashGeneratorStub = new HashGeneratorStub();
  const addAccountRepositoryStub = new AddAccountRepositoryStub();
  const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub();
  loadAccountByEmailRepositoryStub.response = null;
  const sut = new DbAddAccount(
    hashGeneratorStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
  );

  return { sut, hashGeneratorStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub };
};

describe('DbAddAccount', () => {
  it('should call HashGenerator with correct password', async () => {
    const { sut, hashGeneratorStub } = makeSut();
    const hashGeneratorSpy = jest.spyOn(hashGeneratorStub, 'generate');
    const accountData = mockAddAccountDTO();

    await sut.add(accountData);

    expect(hashGeneratorSpy).toHaveBeenCalledWith(accountData.password);
  });

  it('should throw if HashGenerator throws', async () => {
    const { sut, hashGeneratorStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(hashGeneratorStub, 'generate').mockRejectedValueOnce(error);

    const promise = sut.add(mockAddAccountDTO());

    await expect(promise).rejects.toThrow(error);
  });

  it('should call AddAccountRepository with correct values', async () => {
    const { sut, hashGeneratorStub, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    const accountData = mockAddAccountDTO();

    await sut.add(accountData);

    expect(addSpy).toHaveBeenCalledWith({
      ...accountData,
      password: hashGeneratorStub.response,
    });
  });

  it('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(error);

    const promise = sut.add(mockAddAccountDTO());

    await expect(promise).rejects.toThrow(error);
  });

  it('should return an AccountModel on success', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    const account = await sut.add(mockAddAccountDTO());

    expect(account).toEqual(addAccountRepositoryStub.response);
  });

  it('should call LoadAccountByEmailRepository with correct values', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');
    const accountData = mockAddAccountDTO();

    await sut.add(accountData);

    expect(loadByEmailSpy).toHaveBeenCalledWith(accountData.email);
  });

  it('should return null if LoadAccountByEmailRepository does not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    loadAccountByEmailRepositoryStub.response = mockAccountModel();

    const account = await sut.add(mockAddAccountDTO());

    expect(account).toBeNull();
  });

  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockRejectedValueOnce(error);

    const promise = sut.add(mockAddAccountDTO());

    await expect(promise).rejects.toThrow(error);
  });
});

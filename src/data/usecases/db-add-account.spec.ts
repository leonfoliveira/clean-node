import { EncrypterStub } from '@/data/mocks';
import { mockAddAccountParams } from '@/presentation/mocks/mock-add-account';

import { DbAddAccount } from './db-add-account';

describe('DbAddAccount', () => {
  it('should call Encrypter with correct password', () => {
    const encrypterStub = new EncrypterStub();
    const sut = new DbAddAccount(encrypterStub);
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = mockAddAccountParams();

    sut.add(accountData);

    expect(encrypterSpy).toHaveBeenCalledWith(accountData.password);
  });
});

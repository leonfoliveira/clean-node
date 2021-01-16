import { DbAuthentication } from '@/data/usecases';
import { LoadAccountByEmailRepositoryStub } from '@/test/data/mocks';
import { mockAuthenticationDTO } from '@/test/domain/mocks';

describe('DbAuthentication', () => {
  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub();
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub);
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load');
    const authenticationDTO = mockAuthenticationDTO();

    await sut.auth(authenticationDTO);

    expect(loadSpy).toHaveBeenCalledWith(authenticationDTO.email);
  });
});

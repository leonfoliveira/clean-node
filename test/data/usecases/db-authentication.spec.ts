import { DbAuthentication } from '@/data/usecases';
import { LoadAccountByEmailRepositoryStub } from '@/test/data/mocks';
import { mockAuthenticationDTO } from '@/test/domain/mocks';

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepositoryStub;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub();
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub);

  return { sut, loadAccountByEmailRepositoryStub };
};

describe('DbAuthentication', () => {
  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load');
    const authenticationDTO = mockAuthenticationDTO();

    await sut.auth(authenticationDTO);

    expect(loadSpy).toHaveBeenCalledWith(authenticationDTO.email);
  });
});

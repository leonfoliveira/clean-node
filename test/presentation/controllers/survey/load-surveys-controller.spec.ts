import faker from 'faker';

import { LoadSurveysController } from '@/presentation/controllers';
import { HttpResponseFactory } from '@/presentation/helpers';
import { LoadSurveysStub } from '@/test/domain/mocks/usecases';
import { mockLoadSurveysHttpRequest } from '@/test/presentation/mocks/http-requests';

type SutTypes = {
  sut: LoadSurveysController;
  loadSurveysStub: LoadSurveysStub;
};

const makeSut = (): SutTypes => {
  const loadSurveysStub = new LoadSurveysStub();
  const sut = new LoadSurveysController(loadSurveysStub);

  return { sut, loadSurveysStub };
};

describe('LoadSurveysController', () => {
  it('should call LoadSurveys with correct values', async () => {
    const { sut, loadSurveysStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadSurveysStub, 'loadAll');
    const httpRequest = mockLoadSurveysHttpRequest();

    await sut.handle(httpRequest);

    expect(loadAllSpy).toHaveBeenCalledWith({ accountId: httpRequest.headers.accountId });
  });

  it('should return 200 on success', async () => {
    const { sut, loadSurveysStub } = makeSut();

    const httpResponse = await sut.handle(mockLoadSurveysHttpRequest());

    expect(httpResponse).toEqual(HttpResponseFactory.makeOk(loadSurveysStub.response));
  });

  it('should return 204 if result is empty', async () => {
    const { sut, loadSurveysStub } = makeSut();
    loadSurveysStub.response = [];

    const httpResponse = await sut.handle(mockLoadSurveysHttpRequest());

    expect(httpResponse).toEqual(HttpResponseFactory.makeNoContent());
  });

  it('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(loadSurveysStub, 'loadAll').mockRejectedValueOnce(error);

    const httpResponse = await sut.handle(mockLoadSurveysHttpRequest());

    expect(httpResponse).toEqual(HttpResponseFactory.makeInternalServerError(error));
  });
});

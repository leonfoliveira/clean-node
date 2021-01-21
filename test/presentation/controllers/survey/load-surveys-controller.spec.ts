import faker from 'faker';

import { LoadSurveysController } from '@/presentation/controllers';
import { HttpResponseFactory } from '@/presentation/helpers';
import { LoadSurveysStub } from '@/test/domain/mocks/usecases';

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
  it('should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');

    await sut.handle();

    expect(loadSpy).toHaveBeenCalled();
  });

  it('should return 200 on success', async () => {
    const { sut, loadSurveysStub } = makeSut();

    const httpResponse = await sut.handle();

    expect(httpResponse).toEqual(HttpResponseFactory.makeOk(loadSurveysStub.response));
  });

  it('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(loadSurveysStub, 'load').mockRejectedValueOnce(error);

    const httpResponse = await sut.handle();

    expect(httpResponse).toEqual(HttpResponseFactory.makeInternalServerError(error));
  });
});

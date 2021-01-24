import faker from 'faker';

import { LoadSurveyResultController } from '@/presentation/controllers';
import { RegisterNotFoundError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { LoadSurveyByIdStub, LoadSurveyResultStub } from '@/test/domain/mocks/usecases';
import { mockLoadSurveyResultHttpRequest } from '@/test/presentation/mocks';

type SutTypes = {
  sut: LoadSurveyResultController;
  loadSurveyByIdStub: LoadSurveyByIdStub;
  loadSurveyResultStub: LoadSurveyResultStub;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = new LoadSurveyByIdStub();
  const loadSurveyResultStub = new LoadSurveyResultStub();
  const sut = new LoadSurveyResultController(loadSurveyByIdStub, loadSurveyResultStub);

  return { sut, loadSurveyResultStub, loadSurveyByIdStub };
};

describe('LoadSurveyResultController', () => {
  it('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');
    const httpRequest = mockLoadSurveyResultHttpRequest();

    await sut.handle(httpRequest);

    expect(loadByIdSpy).toHaveBeenCalledWith({
      id: httpRequest.params.surveyId,
    });
  });

  it('should return 404 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    loadSurveyByIdStub.response = null;

    const httpResponse = await sut.handle(mockLoadSurveyResultHttpRequest());

    expect(httpResponse).toEqual(
      HttpResponseFactory.makeNotFound(new RegisterNotFoundError('survey')),
    );
  });

  it('should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockRejectedValueOnce(error);

    const httpResponse = await sut.handle(mockLoadSurveyResultHttpRequest());

    expect(httpResponse).toEqual(HttpResponseFactory.makeInternalServerError(error));
  });

  it('should call LoadSurveyResult with correct values', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveyResultStub, 'load');
    const httpRequest = mockLoadSurveyResultHttpRequest();

    await sut.handle(httpRequest);

    expect(loadSpy).toHaveBeenCalledWith({
      surveyId: httpRequest.params.surveyId,
      accountId: httpRequest.headers.accountId,
    });
  });

  it('should return 404 if LoadSurveyResult returns null', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    loadSurveyResultStub.response = null;

    const httpResponse = await sut.handle(mockLoadSurveyResultHttpRequest());

    expect(httpResponse).toEqual(
      HttpResponseFactory.makeNotFound(new RegisterNotFoundError('surveyResult')),
    );
  });

  it('should return 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(loadSurveyResultStub, 'load').mockRejectedValueOnce(error);

    const httpResponse = await sut.handle(mockLoadSurveyResultHttpRequest());

    expect(httpResponse).toEqual(HttpResponseFactory.makeInternalServerError(error));
  });
});

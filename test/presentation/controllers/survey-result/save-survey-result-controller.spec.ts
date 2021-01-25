import faker from 'faker';
import MockDate from 'mockdate';

import { SaveSurveyResultController } from '@/presentation/controllers';
import { RegisterNotFoundError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { LoadSurveyByIdStub, SaveSurveyResultStub } from '@/test/domain/mocks/usecases';
import { generateStringDifferent } from '@/test/helpers';
import { mockSaveSurveyResultRequest } from '@/test/presentation/mocks';

type SutTypes = {
  sut: SaveSurveyResultController;
  loadSurveyByIdStub: LoadSurveyByIdStub;
  saveSurveyResultStub: SaveSurveyResultStub;
  request: SaveSurveyResultController.Request;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = new LoadSurveyByIdStub();
  const saveSurveyResultStub = new SaveSurveyResultStub();
  const sut = new SaveSurveyResultController(loadSurveyByIdStub, saveSurveyResultStub);
  const request = mockSaveSurveyResultRequest();
  request.answer = loadSurveyByIdStub.response.answers[0].answer;

  return { sut, loadSurveyByIdStub, saveSurveyResultStub, request };
};

describe('SaveSurveyResultController', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub, request } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');

    await sut.handle(request);

    expect(loadByIdSpy).toHaveBeenCalledWith({ id: request.surveyId });
  });

  it('should return 404 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub, request } = makeSut();
    loadSurveyByIdStub.response = null;

    const httpResponse = await sut.handle(request);

    expect(httpResponse).toEqual(
      HttpResponseFactory.makeNotFound(new RegisterNotFoundError('survey')),
    );
  });

  it('should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub, request } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockRejectedValueOnce(error);

    const httpResponse = await sut.handle(request);

    expect(httpResponse).toEqual(HttpResponseFactory.makeInternalServerError(error));
  });

  it('should return 404 if non existent answer is provided', async () => {
    const { sut, loadSurveyByIdStub, request } = makeSut();
    request.answer = generateStringDifferent(
      `${loadSurveyByIdStub.response.answers[0].answer}${loadSurveyByIdStub.response.answers[1].answer}`,
    );

    const httpResponse = await sut.handle(request);

    expect(httpResponse).toEqual(
      HttpResponseFactory.makeNotFound(new RegisterNotFoundError('answer')),
    );
  });

  it('should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub, request } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save');

    await sut.handle(request);

    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: request.surveyId,
      accountId: request.accountId,
      date: new Date(),
      answer: request.answer,
    });
  });

  it('should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub, request } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(saveSurveyResultStub, 'save').mockRejectedValueOnce(error);

    const httpResponse = await sut.handle(request);

    expect(httpResponse).toEqual(HttpResponseFactory.makeInternalServerError(error));
  });

  it('should return 200 if SaveSurveyResult on success', async () => {
    const { sut, saveSurveyResultStub, request } = makeSut();

    const httpResponse = await sut.handle(request);

    expect(httpResponse).toEqual(HttpResponseFactory.makeOk(saveSurveyResultStub.response));
  });
});

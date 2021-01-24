import faker from 'faker';
import MockDate from 'mockdate';

import { SaveSurveyResultController } from '@/presentation/controllers';
import { RegisterNotFoundError } from '@/presentation/errors';
import { HttpResponseFactory } from '@/presentation/helpers';
import { HttpRequest } from '@/presentation/interfaces';
import { LoadSurveyByIdStub, SaveSurveyResultStub } from '@/test/domain/mocks/usecases';
import { generateStringDifferent } from '@/test/helpers';
import { mockSaveSurveyResultHttpRequest } from '@/test/presentation/mocks';

type SutTypes = {
  sut: SaveSurveyResultController;
  loadSurveyByIdStub: LoadSurveyByIdStub;
  saveSurveyResultStub: SaveSurveyResultStub;
  params: HttpRequest;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = new LoadSurveyByIdStub();
  const saveSurveyResultStub = new SaveSurveyResultStub();
  const sut = new SaveSurveyResultController(loadSurveyByIdStub, saveSurveyResultStub);
  const params = mockSaveSurveyResultHttpRequest();
  params.body.answer = loadSurveyByIdStub.response.answers[0].answer;

  return { sut, loadSurveyByIdStub, saveSurveyResultStub, params };
};

describe('SaveSurveyResultController', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub, params } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');

    await sut.handle(params);

    expect(loadByIdSpy).toHaveBeenCalledWith({ id: params.params.surveyId });
  });

  it('should return 404 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub, params } = makeSut();
    loadSurveyByIdStub.response = null;

    const httpResponse = await sut.handle(params);

    expect(httpResponse).toEqual(
      HttpResponseFactory.makeNotFound(new RegisterNotFoundError('survey')),
    );
  });

  it('should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub, params } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockRejectedValueOnce(error);

    const httpResponse = await sut.handle(params);

    expect(httpResponse).toEqual(HttpResponseFactory.makeInternalServerError(error));
  });

  it('should return 404 if non existent answer is provided', async () => {
    const { sut, loadSurveyByIdStub, params } = makeSut();
    Object.assign(params.body, {
      answer: generateStringDifferent(
        `${loadSurveyByIdStub.response.answers[0].answer}${loadSurveyByIdStub.response.answers[1].answer}`,
      ),
    });

    const httpResponse = await sut.handle(params);

    expect(httpResponse).toEqual(
      HttpResponseFactory.makeNotFound(new RegisterNotFoundError('answer')),
    );
  });

  it('should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub, params } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save');

    await sut.handle(params);

    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: params.params.surveyId,
      accountId: params.headers.accountId,
      date: new Date(),
      answer: params.body.answer,
    });
  });

  it('should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub, params } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(saveSurveyResultStub, 'save').mockRejectedValueOnce(error);

    const httpResponse = await sut.handle(params);

    expect(httpResponse).toEqual(HttpResponseFactory.makeInternalServerError(error));
  });

  it('should return 200 if SaveSurveyResult on success', async () => {
    const { sut, saveSurveyResultStub, params } = makeSut();

    const httpResponse = await sut.handle(params);

    expect(httpResponse).toEqual(HttpResponseFactory.makeOk(saveSurveyResultStub.response));
  });
});

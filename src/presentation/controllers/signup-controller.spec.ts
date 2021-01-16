import faker from 'faker';

import { AddAccountStub } from '@/domain/mocks';
import { InvalidParamError, ServerError } from '@/presentation/errors';
import { HttpRequest, HttpResponse } from '@/presentation/interfaces';
import { EmailValidatorStub, ValidatorStub } from '@/presentation/mocks';

import { SignUpController } from './signup-controller';

type SutTypes = {
  sut: SignUpController;
  emailValidatorStub: EmailValidatorStub;
  addAccountStub: AddAccountStub;
  validatorStub: ValidatorStub;
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = new EmailValidatorStub();
  const addAccountStub = new AddAccountStub();
  const validatorStub = new ValidatorStub(faker.database.column());
  const sut = new SignUpController(emailValidatorStub, addAccountStub, validatorStub);

  return { sut, emailValidatorStub, addAccountStub, validatorStub };
};

const mockSignupHttpRequest = (): HttpRequest => {
  const password = faker.internet.password();
  return {
    body: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password,
    },
  };
};

describe('SignUp Controller', () => {
  it('should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    const addSpy = jest.spyOn(addAccountStub, 'add');
    const { passwordConfirmation, ...addAccountParams } = httpRequest.body;

    await sut.handle(httpRequest);

    expect(addSpy).toHaveBeenCalledWith(addAccountParams);
  });

  it('should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut();
    const httpRequest = mockSignupHttpRequest();
    const error = new Error(faker.random.words());
    error.stack = faker.random.words();
    jest.spyOn(addAccountStub, 'add').mockRejectedValueOnce(error);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(HttpResponse.InternalServerError(new ServerError(error.stack)));
  });

  it('should return 200 if valid data is provided', async () => {
    const { sut, addAccountStub } = makeSut();
    const httpRequest = mockSignupHttpRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(HttpResponse.Ok(addAccountStub.response));
  });

  it('should call Validation with correct value', async () => {
    const { sut, validatorStub } = makeSut();
    const validateSpy = jest.spyOn(validatorStub, 'validate');
    const httpRequest = mockSignupHttpRequest();

    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  it('should returns 400 if Validation returns an error', async () => {
    const { sut, validatorStub } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(error);
    const httpRequest = mockSignupHttpRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(HttpResponse.BadRequest(error));
  });
});

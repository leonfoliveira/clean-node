import faker from 'faker';
import Joi, { ObjectSchema, ValidationError } from 'joi';

import { JoiAdapter } from '@/infra';

type SutTypes = {
  sut: JoiAdapter;
  schema: ObjectSchema;
};

const makeSut = (): SutTypes => {
  const schema = Joi.object({
    [faker.database.column()]: Joi.string(),
  });
  jest.spyOn(schema, 'validate').mockReturnValue({ value: {}, error: undefined });
  const sut = new JoiAdapter(schema);

  return { sut, schema };
};

const mockData = (): Record<string, string> => ({
  [faker.database.column()]: faker.random.words(),
});

describe('JoiAdapter', () => {
  it('should call joi.validate with correct values', () => {
    const { sut, schema } = makeSut();
    const validateSpy = jest.spyOn(schema, 'validate');
    const data = mockData();

    sut.validate(data);

    expect(validateSpy).toBeCalledWith(data);
  });

  it('should return null if joi.validate does not return an error', () => {
    const { sut } = makeSut();

    const result = sut.validate(mockData());

    expect(result).toBeNull();
  });

  it('should return an Error if joi.validate returns an error', () => {
    const { sut, schema } = makeSut();
    const error = new ValidationError(faker.random.words(), null, null);
    jest.spyOn(schema, 'validate').mockReturnValue({ value: {}, error });

    const result = sut.validate(mockData());

    expect(result).toEqual(new Error(error.message));
  });

  it('should throw if joi.validate throws', () => {
    const { sut, schema } = makeSut();
    const error = new Error(faker.random.words());
    jest.spyOn(schema, 'validate').mockImplementationOnce(() => {
      throw error;
    });

    expect(() => sut.validate(schema)).toThrow(error);
  });
});

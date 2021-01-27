import faker from 'faker';
import Joi, { ObjectSchema } from 'joi';

import { JoiValidatorAdapter } from '@/validation';

type SutTypes = {
  sut: JoiValidatorAdapter;
  schema: ObjectSchema;
};

const makeSut = (): SutTypes => {
  const schema = Joi.object({
    [faker.database.column()]: Joi.string(),
  });
  jest.spyOn(schema, 'validate').mockReturnValue({ value: {}, error: undefined });
  const sut = new JoiValidatorAdapter(schema);

  return { sut, schema };
};

describe('JoiValidatorAdapter', () => {
  it('should call joi.validate with correct values', () => {
    const { sut, schema } = makeSut();
    const validateSpy = jest.spyOn(schema, 'validate');
    const data = { [faker.database.column()]: faker.random.words() };

    sut.validate(data);

    expect(validateSpy).toBeCalledWith(data);
  });

  it('should return null if joi.validate does not return an error', () => {
    const { sut } = makeSut();
    const data = { [faker.database.column()]: faker.random.words() };

    const result = sut.validate(data);

    expect(result).toBeNull();
  });
});

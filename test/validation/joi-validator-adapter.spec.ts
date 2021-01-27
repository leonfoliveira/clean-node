import faker from 'faker';
import Joi from 'joi';

import { JoiValidatorAdapter } from '@/validation';

describe('JoiValidatorAdapter', () => {
  it('should call joi.validate with correct values', () => {
    const schema = Joi.object({
      [faker.database.column()]: Joi.string(),
    });
    jest.spyOn(schema, 'validate').mockReturnValueOnce({ value: {}, error: undefined });
    const validateSpy = jest.spyOn(schema, 'validate');
    const sut = new JoiValidatorAdapter(schema);
    const data = { [faker.database.column()]: faker.random.words() };

    sut.validate(data);

    expect(validateSpy).toBeCalledWith(data);
  });
});

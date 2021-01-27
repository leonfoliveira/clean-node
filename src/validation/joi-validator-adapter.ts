import { Schema } from 'joi';

import { InvalidParamError } from '@/presentation/errors';
import { Validator } from '@/presentation/interfaces';

export class JoiValidatorAdapter implements Validator {
  constructor(private readonly schema: Schema) {}

  validate(data: Record<string, any>): Error {
    const result = this.schema.validate(data);
    if (result.error) {
      return new InvalidParamError(result.error.message);
    }

    return null;
  }
}

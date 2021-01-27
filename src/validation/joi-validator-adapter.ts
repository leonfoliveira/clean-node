import { Schema } from 'joi';

import { Validator } from '@/presentation/interfaces';

export class JoiValidatorAdapter implements Validator {
  constructor(private readonly schema: Schema) {}

  validate(data: Record<string, any>): Error {
    this.schema.validate(data);

    return null;
  }
}

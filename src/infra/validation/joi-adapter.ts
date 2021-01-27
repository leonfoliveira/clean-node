import { Schema } from 'joi';

import { Validator } from '@/data/interfaces';

export class JoiAdapter implements Validator {
  constructor(private readonly schema: Schema) {}

  validate(data: Record<string, any>): Error {
    const result = this.schema.validate(data);
    if (result.error) {
      return new Error(result.error.message);
    }

    return null;
  }
}

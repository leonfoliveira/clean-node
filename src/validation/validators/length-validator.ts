import { InvalidParamError } from '@/presentation/errors';
import { Validator } from '@/presentation/interfaces';

export class LengthValidator implements Validator {
  constructor(private readonly fieldName: string, private readonly options: { min?: number }) {}

  validate(input: Record<string, any>): Error {
    if (
      this.options.min &&
      (!input[this.fieldName] || input[this.fieldName].length < this.options.min)
    ) {
      return new InvalidParamError(this.fieldName);
    }
    return null;
  }
}

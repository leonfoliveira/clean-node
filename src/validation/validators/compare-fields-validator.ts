import { InvalidParamError } from '@/presentation/errors';
import { Validator } from '@/presentation/interfaces';

export class CompareFieldsValidator implements Validator {
  constructor(private readonly fieldName: string, private readonly fieldToCompareName: string) {}

  validate(input: Record<string, any>): Error {
    if (input[this.fieldName] === input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldName);
    }
    return null;
  }
}

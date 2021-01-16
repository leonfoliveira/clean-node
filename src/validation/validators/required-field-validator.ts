import { MissingParamError } from '@/presentation/errors';
import { Validation } from '@/presentation/interfaces';

export class RequiredFieldValidator implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: Record<string, any>): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
    return null;
  }
}

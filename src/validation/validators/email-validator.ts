import { InvalidParamError } from '@/presentation/errors';
import { Validator } from '@/presentation/interfaces';

export class EmailValidator implements Validator {
  constructor(private readonly fieldName: string) {}

  validate(input: Record<string, any>): Error {
    const emailRegex = /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/;
    return !input[this.fieldName] || emailRegex.test(input[this.fieldName])
      ? null
      : new InvalidParamError(this.fieldName);
  }
}

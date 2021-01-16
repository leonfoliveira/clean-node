import { Validator } from '@/presentation/interfaces';

export class ValidatorStub implements Validator {
  constructor(private readonly fieldName: string) {}

  response = null as Error;

  validate(): Error {
    return this.response;
  }
}

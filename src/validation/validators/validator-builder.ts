import { Validator } from '@/presentation/interfaces';
import {
  CompareFieldsValidator,
  RequiredFieldValidator,
  EmailValidator,
} from '@/validation/validators';

export class ValidatorBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validators: Validator[],
  ) {}

  static field(fieldName: string): ValidatorBuilder {
    return new ValidatorBuilder(fieldName, []);
  }

  required(): ValidatorBuilder {
    this.validators.push(new RequiredFieldValidator(this.fieldName));
    return this;
  }

  email(): ValidatorBuilder {
    this.validators.push(new EmailValidator(this.fieldName));
    return this;
  }

  sameAs(fieldToCompareName: string): ValidatorBuilder {
    this.validators.push(new CompareFieldsValidator(this.fieldName, fieldToCompareName));
    return this;
  }

  build(): Validator[] {
    return this.validators;
  }
}

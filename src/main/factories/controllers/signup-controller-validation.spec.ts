import {
  CompareFieldsValidator,
  EmailValidator,
  RequiredFieldValidator,
  ValidatorComposite,
} from '@/validation/validators';

import { makeSignUpValidator } from './signup-controller-factory';

describe('SignUpController.Validator', () => {
  it('should call ValidatorComposite with all validators', () => {
    const validator = makeSignUpValidator();
    expect(validator).toEqual(
      new ValidatorComposite([
        new RequiredFieldValidator('name'),
        new RequiredFieldValidator('email'),
        new EmailValidator('email'),
        new RequiredFieldValidator('password'),
        new CompareFieldsValidator('passwordConfirmation', 'password'),
      ]),
    );
  });
});

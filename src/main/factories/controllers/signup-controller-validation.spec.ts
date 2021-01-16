import { RequiredFieldValidator, ValidatorComposite } from '@/validation/validators';

import { makeSignUpValidator } from './signup-controller-factory';

describe('SignUpController.Validator', () => {
  it('should call ValidatorComposite with all validators', () => {
    const validator = makeSignUpValidator();
    expect(validator).toEqual(
      new ValidatorComposite([
        new RequiredFieldValidator('name'),
        new RequiredFieldValidator('email'),
        new RequiredFieldValidator('password'),
        new RequiredFieldValidator('passwordConfirmation'),
      ]),
    );
  });
});

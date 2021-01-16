import { RequiredFieldValidator, ValidationComposite } from '@/validation/validators';

import { makeSignUpValidation } from './signup-controller-factory';

describe('SignUpController.Validation', () => {
  it('should call ValidationComposite with all validations', () => {
    const validation = makeSignUpValidation();
    expect(validation).toEqual(
      new ValidationComposite([
        new RequiredFieldValidator('name'),
        new RequiredFieldValidator('email'),
        new RequiredFieldValidator('password'),
        new RequiredFieldValidator('passwordConfirmation'),
      ]),
    );
  });
});

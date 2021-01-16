import { RequiredFieldValidator, ValidatorComposite } from '@/validation/validators';

import { makeSignUpValidator } from './signup-controller-factory';

describe('SignUpController.Validation', () => {
  it('should call ValidationComposite with all validations', () => {
    const validation = makeSignUpValidator();
    expect(validation).toEqual(
      new ValidatorComposite([
        new RequiredFieldValidator('name'),
        new RequiredFieldValidator('email'),
        new RequiredFieldValidator('password'),
        new RequiredFieldValidator('passwordConfirmation'),
      ]),
    );
  });
});

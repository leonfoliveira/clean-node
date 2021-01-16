import {
  EmailValidator,
  RequiredFieldValidator,
  ValidatorComposite,
} from '@/validation/validators';

import { makeLoginValidator } from './login-controller-factory';

describe('LoginController.Validator', () => {
  it('should call ValidatorComposite with all validators', () => {
    const validator = makeLoginValidator();
    expect(validator).toEqual(
      new ValidatorComposite([
        new RequiredFieldValidator('email'),
        new EmailValidator('email'),
        new RequiredFieldValidator('password'),
      ]),
    );
  });
});

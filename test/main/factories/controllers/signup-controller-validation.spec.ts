import { makeSignUpValidator } from '@/main/factories/controllers';
import {
  CompareFieldsValidator,
  EmailValidator,
  RequiredFieldValidator,
  ValidatorComposite,
  LengthValidator,
} from '@/validation/validators';

describe('SignUpController.Validator', () => {
  it('should call ValidatorComposite with all validators', () => {
    const validator = makeSignUpValidator();
    expect(validator).toEqual(
      new ValidatorComposite([
        new RequiredFieldValidator('name'),
        new RequiredFieldValidator('email'),
        new EmailValidator('email'),
        new RequiredFieldValidator('password'),
        new LengthValidator('password', { min: 8 }),
        new CompareFieldsValidator('passwordConfirmation', 'password'),
      ]),
    );
  });
});

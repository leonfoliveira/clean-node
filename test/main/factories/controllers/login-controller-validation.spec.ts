import { makeLoginValidator } from '@/main/factories/controllers';
import { ValidatorComposite } from '@/validation/helpers';
import { EmailValidator, RequiredFieldValidator } from '@/validation/validators';

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

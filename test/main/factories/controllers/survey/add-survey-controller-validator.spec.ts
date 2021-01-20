import { makeSurveyValidator } from '@/main/factories/controllers';
import { ValidatorComposite } from '@/validation/helpers';
import { RequiredFieldValidator } from '@/validation/validators';

describe('AddSurveyController.Validator', () => {
  it('should call ValidatorComposite with all validators', () => {
    const validator = makeSurveyValidator();
    expect(validator).toEqual(
      new ValidatorComposite([
        new RequiredFieldValidator('question'),
        new RequiredFieldValidator('answers'),
      ]),
    );
  });
});

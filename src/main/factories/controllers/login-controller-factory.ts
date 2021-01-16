import { Validator } from '@/presentation/interfaces';
import { ValidatorBuilder, ValidatorComposite } from '@/validation/helpers';

export const makeLoginValidator = (): Validator =>
  new ValidatorComposite([
    ...ValidatorBuilder.field('email').required().email().build(),
    ...ValidatorBuilder.field('password').required().build(),
  ]);

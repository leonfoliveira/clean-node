export interface Validator {
  validate: (data: Record<string, any>) => Error;
}

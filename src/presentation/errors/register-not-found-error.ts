export class RegisterNotFoundError extends Error {
  constructor(register: string) {
    super(`${register} not found`);
    this.name = 'RegisterNotFoundError';
  }
}

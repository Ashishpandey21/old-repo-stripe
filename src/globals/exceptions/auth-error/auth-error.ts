export class AuthError extends Error {
  constructor() {
    super('Invalid credentials');
  }
}

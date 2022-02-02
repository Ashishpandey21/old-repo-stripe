import { AuthError } from './auth-error';

describe('AuthError', () => {
  it('should be defined', () => {
    expect(new AuthError()).toBeDefined();
  });
});

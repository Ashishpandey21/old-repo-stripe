import { AdminLoginAccessTokenGuard } from './admin-login-access-token.guard';

describe('AdminLoginAccessTokenGuard', () => {
  it('should be defined', () => {
    expect(new AdminLoginAccessTokenGuard()).toBeDefined();
  });
});

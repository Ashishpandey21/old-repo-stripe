import { UnauthorizedInterceptor } from './unauthorized.interceptor';

describe('UnauthorizedInterceptor', () => {
  it('should be defined', () => {
    expect(new UnauthorizedInterceptor()).toBeDefined();
  });
});

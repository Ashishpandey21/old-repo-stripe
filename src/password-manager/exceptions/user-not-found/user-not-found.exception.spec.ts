import { UserNotFoundException } from './user-not-found.exception';

describe('UserNotFoundException', () => {
  it('should be defined', () => {
    expect(new UserNotFoundException()).toBeDefined();
  });
});

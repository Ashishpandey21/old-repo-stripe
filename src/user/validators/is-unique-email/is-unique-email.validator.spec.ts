import { CheckEmailExistValidator } from './is-unique-email.validator';

describe('CheckEmailExistValidator', () => {
  it('should be defined', () => {
    expect(new CheckEmailExistValidator()).toBeDefined();
  });
});

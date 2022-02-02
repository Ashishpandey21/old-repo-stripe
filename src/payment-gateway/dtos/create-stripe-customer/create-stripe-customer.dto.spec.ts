import { CreateStripeCustomerDto } from './create-stripe-customer.dto';

describe('CreateStripeCustomerDto', () => {
  it('should be defined', () => {
    expect(new CreateStripeCustomerDto()).toBeDefined();
  });
});

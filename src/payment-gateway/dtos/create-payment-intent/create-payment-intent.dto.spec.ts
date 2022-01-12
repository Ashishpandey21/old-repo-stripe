import { CreatePaymentIntentDto } from './create-payment-intent.dto';

describe('CreatePaymentIntentDto', () => {
  it('should be defined', () => {
    expect(new CreatePaymentIntentDto()).toBeDefined();
  });
});

import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement, createPaymentIntent } from '../libs/payment.js';

export default (stripePublishableKey) => ({
  name: 'PersonalInfo',
  hidden: false,
  fetchingPaymentIntent: false,
  disabled: false,
  stripeElement: null,

  async init() {
    this.stripeElement = new PaymentElement(
      await loadStripe(stripePublishableKey),
    );
  },

  async reMountStripeElement() {
    this.fetchingPaymentIntent = true;
    const response = await createPaymentIntent('oneTime', 'usd', 10000);
    this.stripeElement.updateSecretKey(response.client_secret);
    this.fetchingPaymentIntent = false;
  },
});

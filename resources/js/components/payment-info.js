import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement, createPaymentIntent } from '../libs/payment.js';

export default (stripePublishableKey) => ({
  name: 'PersonalInfo',
  fetchingPaymentIntent: false,
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

  previous() {
    this.$store._.hide(['IntroSection', 'AmountSelection', 'PaymentInfo']);
    this.$store._.show(['PersonalInfo']);
  },

  get showPaymentForm() {
    if (this.form.paymentType === 'oneTime') {
      return true;
    }

    return this.$store._.accountCreated;
  },
});

import { loadStripe } from '@stripe/stripe-js';
import Alpine from 'alpinejs';

import AmountSelection from './components/amount-selection.js';
import PersonalInfo from './components/personal-info.js';
import PaymentInfo from './components/payment-info.js';

import {
  PaymentElement,
  createPaymentIntent,
  createConfirmCardPayload,
} from './libs/payment.js';
import { FORM_DEFAULT } from './constants.js';
import { makeForm } from './libs/form.js';
import { showSuccessModal } from './libs/modal.js';
import Store from './store.js';

import '../../resources/scss/style.scss';

const Home = (stripePublishableKey) => ({
  ...makeForm(FORM_DEFAULT),

  stripeElement: null,
  fetchingPaymentIntent: false,

  async init() {
    this.stripeElement = new PaymentElement(
      await loadStripe(stripePublishableKey),
    );

    /**
     * Prevent click bombing.
     * Wait for ${waitFor} seconds before creating a payment intent.
     * If user changes the payment intent props within those ${waitFor} seconds,
     * cancel the old request and create a new one.
     */
    const waitFor = 1 * 1000;
    let requestTimeoutId = null;

    const queueCreatePaymentIntentRequest = () => {
      this.fetchingPaymentIntent = true;
      if (!!requestTimeoutId) clearTimeout(requestTimeoutId);
      requestTimeoutId = setTimeout(() => this.mountPaymentElement(), waitFor);
    };

    this.$watch('form.amount', () => {
      if (this.form.paymentType === 'oneTime') {
        queueCreatePaymentIntentRequest();
      }
    });

    queueCreatePaymentIntentRequest();
  },

  async mountPaymentElement() {
    const response = await createPaymentIntent(this.form);
    this.stripeElement.updateSecretKey(response.client_secret);
    this.fetchingPaymentIntent = false;
  },

  async submit(ev) {
    this.$refs.submitButton.disabled = true;
    if (this.validateAll(ev.originalTarget)) {
      await this.capturePayment();
    }
    this.$refs.submitButton.disabled = false;
  },

  async capturePayment() {
    const { stripe, secretKey } = this.stripeElement;
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      secretKey,
      createConfirmCardPayload(this.stripeElement.card, this.form),
    );

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      this.reset();
      showSuccessModal();
      console.info(`data -- payment successfull`);
    }

    if (error) {
      // FIXME: handle error states
      console.error(`data --`, error);
    }

    console.info('Home -- capturing the payment');
  },

  reset() {
    this.$refs.form.reset();
    this.form = Object.assign(FORM_DEFAULT, {});
    this.stripeElement.clear();
    this.$store._.show(['IntroSection', 'AmountSelection']);
    this.$store._.hide(['PersonalInfo', 'PaymentInfo']);
  },
});

(() => {
  document.addEventListener('alpine:init', () => {
    Alpine.store('_', Store);
    Alpine.data('Home', Home);
    Alpine.data('AmountSelection', AmountSelection);
    Alpine.data('PersonalInfo', PersonalInfo);
    Alpine.data('PaymentInfo', PaymentInfo);
  });

  Alpine.start();
})();

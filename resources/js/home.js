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
      requestTimeoutId = setTimeout(
        async () => await this.mountPaymentElement(),
        waitFor,
      );
    };

    this.$watch('form.amount', () => {
      if (this.form.paymentType === 'oneTime') {
        queueCreatePaymentIntentRequest();
      }
    });

    this.$watch('form.includeFees', () => {
      if (this.form.paymentType === 'oneTime') {
        queueCreatePaymentIntentRequest();
      }
    });
  },

  async mountPaymentElement() {
    let mounted = false;

    this.fetchingPaymentIntent = true;
    const { errors, intent } = await createPaymentIntent(this.form);

    if (!errors) {
      this.stripeElement.updateSecretKey(intent.client_secret);
      mounted = true;
    } else {
      // populate the errors
      Object.keys(errors).forEach((key) => {
        if (key in this.form) this.setError(key, errors[key][0]);
      });
    }

    this.fetchingPaymentIntent = false;

    return mounted;
  },

  async submit(ev) {
    this.$refs.submitButton.disabled = true;
    if (this.validateAll(ev.srcElement)) {
      await this.capturePayment();
    }
    this.$refs.submitButton.disabled = false;
  },

  async capturePayment() {
    this.setError('card', null);

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
      console.error(`data --`, error);
      this.setError('card', error.message);
      this.$refs.submitButton.disabled = false;
    }

    console.info('Home -- capturing the payment');
  },

  async createAccount() {
    this.$refs.createAccountBtn.disabled = true;
    this.$store._.disable(['AmountSelection', 'PersonalInfo']);

    const cleanup = () => {
      if (this.$refs.createAccountBtn) {
        this.$refs.createAccountBtn.disabled = false;
      }
      this.$store._.enable(['AmountSelection', 'PersonalInfo', 'PaymentInfo']);
      this.$store._.customerCreated = false;
    };

    // frontend validation
    if (!this.validateAll(this.$refs.form)) cleanup();

    this.$store._.hide(['IntroSection', 'AmountSelection', 'PersonalInfo']);
    this.$store._.show(['PaymentInfo']);
    this.$store._.customerCreated = true;

    // backend validation
    if (!(await this.mountPaymentElement())) cleanup();
  },

  reset() {
    this.$refs.form.reset();
    this.form = Object.assign(FORM_DEFAULT, {});
    this.stripeElement.clear();
    this.$store._.customerCreated = false;
    this.$store._.show(['IntroSection', 'AmountSelection']);
    this.$store._.hide(['PersonalInfo', 'PaymentInfo']);
    this.$store._.enable(['AmountSelection', 'PersonalInfo', 'PaymentInfo']);
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

import Alpine from 'alpinejs';
import { loadStripe } from '@stripe/stripe-js';
import {
  PaymentElement,
  createPaymentIntent,
  showSuccessModal,
} from './helpers.js';
import '../../resources/scss/style.scss';

const initialState = () => ({
  currency: 'usd',

  // can be: ['oneTime', 'recurring']
  donationType: 'oneTime',
  donationAmount: '25',

  salutation: 'Mr.',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  company: '',
  country: '',
  city: '',
  state: '',
  zipPostalCode: '',
  address1: '',
  address2: '',
});

const data = (stripePublishableKey) => ({
  stripeElement: null,
  fetchingPaymentIntent: true,

  showPaymentInfo: true,

  // can be: ['donation-type', 'personal-info', 'payment-info']
  toggleSecState: 'donation-type',

  ...initialState(),

  currencies: {
    usd: '$',
    aud: '$',
    eur: '€',
    gbp: '£',
    krw: '₩',
    nzd: '$',
    thb: '฿',
    jpy: '¥',
    brl: '$',
    cad: '$',
  },

  get donationAmounts() {
    const amounts = {
      usd: ['25', '50', '100', '200', '500'],
      aud: ['30', '60', '100', '200', '500'],
      eur: ['15', '40', '80', '150', '500'],
      gbp: ['15', '30', '60', '100', '500'],
      krw: ['20', '50', '100', '200', '500'],
      nzd: ['50', '100', '200', '500', '800'],
      thb: ['500', '1000', '2000', '5000', '10000'],
      jpy: ['2000', '5000', '10000', '20000', '500000'],
      brl: ['80', '200', '400', '800', '1000'],
      cad: ['20', '70', '100', '200', '500'],
    }[this.currency];

    return this.donationType === 'oneTime' ? amounts.slice(0, -1) : amounts;
  },

  get fullName() {
    return `${this.salutation} ${this.firstName} ${this.lastName}`;
  },

  get processingFees() {
    return '0.00';
  },

  get currencySymbol() {
    return this.currencies[this.currency];
  },

  async init() {
    this.stripeElement = new PaymentElement(
      await loadStripe(stripePublishableKey),
    );

    const mountPaymentElement = async () => {
      const resp = await createPaymentIntent(
        'oneTime',
        this.currency,
        parseFloat(this.donationAmount),
      );
      this.stripeElement.updateSecretKey(resp.client_secret);
      this.fetchingPaymentIntent = false;
    };

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
      requestTimeoutId = setTimeout(mountPaymentElement, waitFor);
    };

    this.$watch('donationAmount', () => {
      if (this.donationType === 'oneTime') {
        queueCreatePaymentIntentRequest();
      }
    });

    this.$watch('donationType', () => {
      this.showPaymentInfo = this.donationType === 'oneTime';
    });

    mountPaymentElement();

    console.info('data -- instantiated');
  },

  validateForm(formName) {
    // FIXME: validate the input fields
    console.log(`data -- validating ${formName}`);
  },

  resetForm() {
    this.$refs.paymentForm.reset();
    this.stripeElement.clear();

    const { currency, donationType, donationAmount } = initialState();
    this.currency = currency;
    this.donationType = donationType;
    this.donationAmount = donationAmount;
  },

  /**
   * Show/Hide elements in mobile view.
   */
  navigator(navigateTo, forward = true) {
    switch (navigateTo) {
      case 'donation-type':
      case 'personal-info':
      case 'payment-info':
        if (forward) this.validateForm(navigateTo);
        this.toggleSecState = navigateTo;
        window.scroll(0, 0);
        break;

      default:
        throw `data -- Cannot navigate to ${navigateTo}. Invalid navigation key.`;
    }
  },

  async submit() {
    this.$refs.submitButton.disabled = true;
    await this.capturePayment();
    this.$refs.submitButton.disabled = false;
  },

  async capturePayment() {
    const payload = {
      payment_method: {
        card: this.stripeElement.card,
        billing_details: {
          address: {
            city: this.city,
            country: this.country,
            line1: this.address1,
            line2: this.address2,
            postal_code: this.zipPostalCode,
            state: this.state,
          },
          email: this.email,
          name: this.fullName,
          phone: this.phoneNumber,
        },
      },
    };

    const { stripe, secretKey } = this.stripeElement;
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      secretKey,
      payload,
    );

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      this.resetForm();
      showSuccessModal();
      this.navigator('donation-type');
      console.info(`data -- payment successfull`);
    }

    if (error) {
      // FIXME: handle error states
      console.error(`data --`, error);
    }

    console.info('data -- capturing the payment');
  },

  show(selector) {
    switch (selector) {
      case 'personal-info':
        return true;
      case 'amount-selection':
        return true;
      case 'payment-info':
        // return this.donationType === 'oneTime';
        return this.showPaymentInfo;
    }
  },

  async createAccount() {
    this.showPaymentInfo = true;
    this.fetchingPaymentIntent = true;
    const intent = await createPaymentIntent(
      'recurring',
      this.currency,
      // FIXME: make this dynamic
      100000,
    );
    const secret = intent.latest_invoice.payment_intent.client_secret;
    console.log('createAccount -- done');
    this.stripeElement.updateSecretKey(secret);
    this.fetchingPaymentIntent = false;
  },
});

const main = () => {
  document.addEventListener('alpine:init', () => Alpine.data('data', data));
  Alpine.start();
};

main();

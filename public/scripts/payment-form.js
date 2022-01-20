const showSuccessModal = () =>
  new bootstrap.Modal(document.querySelector('#paymentSuccess')).show();

class PaymentElement {
  constructor(stripe) {
    this.stripe = stripe;
    this.elements = this.stripe.elements();
    this.secretKey = null;
  }

  get card() {
    return this.elements._elements[0];
  }

  mount() {
    for (const elementName of ['cardNumber', 'cardCvc', 'cardExpiry']) {
      const el = this.elements.create(elementName);
      el.mount(`#${elementName}-element`);
    }
    console.info('PaymentElement -- mounted');
  }

  destroy() {
    for (const el of this.elements._elements) {
      el.destroy();
    }
    console.info('PaymentElement -- destroyed');
  }

  clear() {
    for (const el of this.elements._elements) {
      el.clear();
    }
    console.info('PaymentElement -- cleared');
  }

  updateSecretKey(secretKey) {
    this.secretKey = secretKey;
    this.destroy();
    this.elements = this.stripe.elements({ secretKey });
    this.mount();
    console.info('PaymentElement -- secretKey updated');
  }
}

const initialState = () => ({
  currency: 'usd',
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

const paymentForm = (stripePublishableKey) => ({
  stripeElement: null,
  fetchingPaymentIntent: true,

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

  init() {
    this.stripeElement = new PaymentElement(Stripe(stripePublishableKey));

    const mountPaymentElement = async () => {
      const clientSecret = await this.createPaymentIntent();
      this.stripeElement.updateSecretKey(clientSecret);
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

    ['currency', 'donationType', 'donationAmount'].forEach((prop) =>
      this.$watch(prop, queueCreatePaymentIntentRequest),
    );

    mountPaymentElement();

    console.info('paymentForm -- instantiated');
  },

  validateForm() {
    // FIXME: validate data
  },

  resetForm() {
    this.$refs.paymentForm.reset();
    this.stripeElement.clear();

    const { currency, donationType, donationAmount } = initialState();
    this.currency = currency;
    this.donationType = donationType;
    this.donationAmount = donationAmount;
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
      console.info(`paymentForm -- payment successfull`);
    }

    if (error) {
      console.error(`paymentForm --`, error);
    }

    console.info('paymentForm -- capturing the payment');
  },

  async createPaymentIntent() {
    try {
      const intent = await (
        await fetch('/pay', {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({
            currency: this.currency,
            amount: parseFloat(this.donationAmount),
          }),
        })
      ).json();

      console.info('paymentForm -- payment intent created');
      return intent.client_secret;
    } catch (e) {
      console.error('paymentForm --', e.message);
    }
  },
});

document.addEventListener('alpine:init', () =>
  Alpine.data('paymentForm', paymentForm),
);

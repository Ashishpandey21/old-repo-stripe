class PaymentElement {
  constructor(stripe) {
    this.stripe = stripe;
    this.elements = this.stripe.elements();
    this.secretKey = null;
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

  updateSecretKey(secretKey) {
    this.secretKey = secretKey;
    this.destroy();
    this.elements = this.stripe.elements({ secretKey });
    this.mount();
    console.info('PaymentElement -- secretKey updated');
  }
}

const paymentForm = (stripePublishableKey) => ({
  stripeElement: new PaymentElement(Stripe(stripePublishableKey)),

  fetchingPaymentIntent: true,

  currency: 'usd',
  donationType: 'oneTime',
  donationAmount: null,

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

  get processingFees() {
    return '0.00';
  },

  get currencySymbol() {
    return this.currencies[this.currency];
  },

  get donationAmounts() {
    const amounts = {
      usd: ['25', '50', '100', '200', '500'],
      aud: ['25', '50', '100', '200', '500'],
      eur: ['25', '50', '100', '200', '500'],
      gbp: ['25', '50', '100', '200', '500'],
      krw: ['25', '50', '100', '200', '500'],
      nzd: ['25', '50', '100', '200', '500'],
      thb: ['25', '50', '100', '200', '500'],
      jpy: ['25', '50', '100', '200', '500'],
      brl: ['25', '50', '100', '200', '500'],
      cad: ['25', '50', '100', '200', '500'],
    }[this.currency];

    return this.donationType === 'oneTime' ? amounts.slice(0, -1) : amounts;
  },

  init() {
    console.info('-- component init');

    this.fetchingPaymentIntent = false;
    this.stripeElement.mount();

    /**
     * Prevent click bombing.
     * Wait for 2 seconds before creating a payment intent.
     * If user changes the payment intent props within those 2 seconds,
     * cancel the old request and create a new one.
     */
    const waitFor = 2 * 1000;
    let requestTimeoutId = null;
    const queueCreatePaymentIntentRequest = () => {
      this.fetchingPaymentIntent = true;

      if (!!requestTimeoutId) clearTimeout(requestTimeoutId);

      requestTimeoutId = setTimeout(async () => {
        const clientSecret = await this.createPaymentIntent();
        this.stripeElement.updateSecretKey(clientSecret);
        this.fetchingPaymentIntent = false;
      }, waitFor);
    };

    ['currency', 'donationType', 'donationAmount'].forEach((prop) =>
      this.$watch(prop, queueCreatePaymentIntentRequest),
    );
  },

  async submit() {
    console.info('-- capturing the payment');

    const { submitButton } = this.$refs;
    const { stripe, secretKey } = this.stripeElement;

    submitButton.disabled = true;

    const { error } = await stripe.confirmCardPayment(secretKey, {
      payment_method: {
        card: this.stripeElement.elements,
      },
    });

    if (error) {
      console.log(error);
    } else {
      submitButton.disabled = false;
    }
  },

  async createPaymentIntent() {
    const data = await (await fetch('/create-payment-intent')).json();
    console.log(data);

    // return data.client_secret;
    console.info('-- payment intent created');
    return 'pi_1Dpeav2eZvKYlo2CwsowXp2k_secret_GvmBEoWO7yqbjMgU0YrwLtgDR';
  },
});

document.addEventListener('alpine:init', () =>
  Alpine.data('paymentForm', paymentForm),
);

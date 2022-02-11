import { countries } from 'countries-list';

export const PAYMENT_TYPES = {
  oneTime: 'oneTime',
  recurring: 'recurring',
};

export const CURRENCIES = {
  usd: '$',
  eur: '€',
  gbp: '£',
  cad: '$',
  aud: '$',
  krw: '₩',
  nzd: '$',
  thb: '฿',
  jpy: '¥',
  brl: '$',
};

export const RECURRING_FREQUENCY = {
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  yearly: 'Yearly',
};

// FIXME: get dynamic values from the server instead of hardcoding
export const RECURRING_PAYMENT_AMOUNTS = {
  usd: {
    monthly: {
      price_1KOrs0SECaNOBWfucXPpmhLK: '25',
      price_1KOrs0SECaNOBWfuLL3onTKn: '50',
      price_1KOrs0SECaNOBWfu5M6JdqDX: '100',
      price_1KOrs0SECaNOBWfuvPrNrg75: '200',
      price_1KOrs0SECaNOBWfu4CoVWjQF: '500',
    },
    quarterly: {
      price_1KQrvLSECaNOBWfuEfXIIE7d: '25',
      price_1KQrvXSECaNOBWfuSMEuXevW: '50',
      price_1KQrvrSECaNOBWfunvfsMkt0: '100',
      price_1KQrxUSECaNOBWfuI9dsdW1V: '200',
      price_1KQrxjSECaNOBWfuikassI98: '500',
    },
    yearly: {
      price_1KQruISECaNOBWfua864FODB: '25',
      price_1KQrubSECaNOBWfuG2B0u69A: '50',
      price_1KQrtNSECaNOBWfup2STfdDI: '100',
      price_1KQrtvSECaNOBWfuU7EMn7Pj: '200',
      price_1KQrtdSECaNOBWfuEgOHsAJg: '500',
    },
  },
  // FIXME: change price ids (currently they are same as the usd ones)
  eur: {
    monthly: {
      price_1KOrs0SECaNOBWfucXPpmhLK: '25',
      price_1KOrs0SECaNOBWfuLL3onTKn: '50',
      price_1KOrs0SECaNOBWfu5M6JdqDX: '100',
      price_1KOrs0SECaNOBWfuvPrNrg75: '200',
      price_1KOrs0SECaNOBWfu4CoVWjQF: '500',
    },
    quarterly: {
      price_1KQrvLSECaNOBWfuEfXIIE7d: '25',
      price_1KQrvXSECaNOBWfuSMEuXevW: '50',
      price_1KQrvrSECaNOBWfunvfsMkt0: '100',
      price_1KQrxUSECaNOBWfuI9dsdW1V: '200',
      price_1KQrxjSECaNOBWfuikassI98: '500',
    },
    yearly: {
      price_1KQruISECaNOBWfua864FODB: '25',
      price_1KQrubSECaNOBWfuG2B0u69A: '50',
      price_1KQrtNSECaNOBWfup2STfdDI: '100',
      price_1KQrtvSECaNOBWfuU7EMn7Pj: '200',
      price_1KQrtdSECaNOBWfuEgOHsAJg: '500',
    },
  },
  gbp: {
    monthly: {
      price_1KOrs0SECaNOBWfucXPpmhLK: '25',
      price_1KOrs0SECaNOBWfuLL3onTKn: '50',
      price_1KOrs0SECaNOBWfu5M6JdqDX: '100',
      price_1KOrs0SECaNOBWfuvPrNrg75: '200',
      price_1KOrs0SECaNOBWfu4CoVWjQF: '500',
    },
    quarterly: {
      price_1KQrvLSECaNOBWfuEfXIIE7d: '25',
      price_1KQrvXSECaNOBWfuSMEuXevW: '50',
      price_1KQrvrSECaNOBWfunvfsMkt0: '100',
      price_1KQrxUSECaNOBWfuI9dsdW1V: '200',
      price_1KQrxjSECaNOBWfuikassI98: '500',
    },
    yearly: {
      price_1KQruISECaNOBWfua864FODB: '25',
      price_1KQrubSECaNOBWfuG2B0u69A: '50',
      price_1KQrtNSECaNOBWfup2STfdDI: '100',
      price_1KQrtvSECaNOBWfuU7EMn7Pj: '200',
      price_1KQrtdSECaNOBWfuEgOHsAJg: '500',
    },
  },
  cad: {
    monthly: {
      price_1KOrs0SECaNOBWfucXPpmhLK: '25',
      price_1KOrs0SECaNOBWfuLL3onTKn: '50',
      price_1KOrs0SECaNOBWfu5M6JdqDX: '100',
      price_1KOrs0SECaNOBWfuvPrNrg75: '200',
      price_1KOrs0SECaNOBWfu4CoVWjQF: '500',
    },
    quarterly: {
      price_1KQrvLSECaNOBWfuEfXIIE7d: '25',
      price_1KQrvXSECaNOBWfuSMEuXevW: '50',
      price_1KQrvrSECaNOBWfunvfsMkt0: '100',
      price_1KQrxUSECaNOBWfuI9dsdW1V: '200',
      price_1KQrxjSECaNOBWfuikassI98: '500',
    },
    yearly: {
      price_1KQruISECaNOBWfua864FODB: '25',
      price_1KQrubSECaNOBWfuG2B0u69A: '50',
      price_1KQrtNSECaNOBWfup2STfdDI: '100',
      price_1KQrtvSECaNOBWfuU7EMn7Pj: '200',
      price_1KQrtdSECaNOBWfuEgOHsAJg: '500',
    },
  },
  aud: {
    monthly: {
      price_1KOrs0SECaNOBWfucXPpmhLK: '25',
      price_1KOrs0SECaNOBWfuLL3onTKn: '50',
      price_1KOrs0SECaNOBWfu5M6JdqDX: '100',
      price_1KOrs0SECaNOBWfuvPrNrg75: '200',
      price_1KOrs0SECaNOBWfu4CoVWjQF: '500',
    },
    quarterly: {
      price_1KQrvLSECaNOBWfuEfXIIE7d: '25',
      price_1KQrvXSECaNOBWfuSMEuXevW: '50',
      price_1KQrvrSECaNOBWfunvfsMkt0: '100',
      price_1KQrxUSECaNOBWfuI9dsdW1V: '200',
      price_1KQrxjSECaNOBWfuikassI98: '500',
    },
    yearly: {
      price_1KQruISECaNOBWfua864FODB: '25',
      price_1KQrubSECaNOBWfuG2B0u69A: '50',
      price_1KQrtNSECaNOBWfup2STfdDI: '100',
      price_1KQrtvSECaNOBWfuU7EMn7Pj: '200',
      price_1KQrtdSECaNOBWfuEgOHsAJg: '500',
    },
  },
  krw: {
    monthly: {
      price_1KOrs0SECaNOBWfucXPpmhLK: '25',
      price_1KOrs0SECaNOBWfuLL3onTKn: '50',
      price_1KOrs0SECaNOBWfu5M6JdqDX: '100',
      price_1KOrs0SECaNOBWfuvPrNrg75: '200',
      price_1KOrs0SECaNOBWfu4CoVWjQF: '500',
    },
    quarterly: {
      price_1KQrvLSECaNOBWfuEfXIIE7d: '25',
      price_1KQrvXSECaNOBWfuSMEuXevW: '50',
      price_1KQrvrSECaNOBWfunvfsMkt0: '100',
      price_1KQrxUSECaNOBWfuI9dsdW1V: '200',
      price_1KQrxjSECaNOBWfuikassI98: '500',
    },
    yearly: {
      price_1KQruISECaNOBWfua864FODB: '25',
      price_1KQrubSECaNOBWfuG2B0u69A: '50',
      price_1KQrtNSECaNOBWfup2STfdDI: '100',
      price_1KQrtvSECaNOBWfuU7EMn7Pj: '200',
      price_1KQrtdSECaNOBWfuEgOHsAJg: '500',
    },
  },
  nzd: {
    monthly: {
      price_1KOrs0SECaNOBWfucXPpmhLK: '25',
      price_1KOrs0SECaNOBWfuLL3onTKn: '50',
      price_1KOrs0SECaNOBWfu5M6JdqDX: '100',
      price_1KOrs0SECaNOBWfuvPrNrg75: '200',
      price_1KOrs0SECaNOBWfu4CoVWjQF: '500',
    },
    quarterly: {
      price_1KQrvLSECaNOBWfuEfXIIE7d: '25',
      price_1KQrvXSECaNOBWfuSMEuXevW: '50',
      price_1KQrvrSECaNOBWfunvfsMkt0: '100',
      price_1KQrxUSECaNOBWfuI9dsdW1V: '200',
      price_1KQrxjSECaNOBWfuikassI98: '500',
    },
    yearly: {
      price_1KQruISECaNOBWfua864FODB: '25',
      price_1KQrubSECaNOBWfuG2B0u69A: '50',
      price_1KQrtNSECaNOBWfup2STfdDI: '100',
      price_1KQrtvSECaNOBWfuU7EMn7Pj: '200',
      price_1KQrtdSECaNOBWfuEgOHsAJg: '500',
    },
  },
  thb: {
    monthly: {
      price_1KOrs0SECaNOBWfucXPpmhLK: '25',
      price_1KOrs0SECaNOBWfuLL3onTKn: '50',
      price_1KOrs0SECaNOBWfu5M6JdqDX: '100',
      price_1KOrs0SECaNOBWfuvPrNrg75: '200',
      price_1KOrs0SECaNOBWfu4CoVWjQF: '500',
    },
    quarterly: {
      price_1KQrvLSECaNOBWfuEfXIIE7d: '25',
      price_1KQrvXSECaNOBWfuSMEuXevW: '50',
      price_1KQrvrSECaNOBWfunvfsMkt0: '100',
      price_1KQrxUSECaNOBWfuI9dsdW1V: '200',
      price_1KQrxjSECaNOBWfuikassI98: '500',
    },
    yearly: {
      price_1KQruISECaNOBWfua864FODB: '25',
      price_1KQrubSECaNOBWfuG2B0u69A: '50',
      price_1KQrtNSECaNOBWfup2STfdDI: '100',
      price_1KQrtvSECaNOBWfuU7EMn7Pj: '200',
      price_1KQrtdSECaNOBWfuEgOHsAJg: '500',
    },
  },
  jpy: {
    monthly: {
      price_1KOrs0SECaNOBWfucXPpmhLK: '25',
      price_1KOrs0SECaNOBWfuLL3onTKn: '50',
      price_1KOrs0SECaNOBWfu5M6JdqDX: '100',
      price_1KOrs0SECaNOBWfuvPrNrg75: '200',
      price_1KOrs0SECaNOBWfu4CoVWjQF: '500',
    },
    quarterly: {
      price_1KQrvLSECaNOBWfuEfXIIE7d: '25',
      price_1KQrvXSECaNOBWfuSMEuXevW: '50',
      price_1KQrvrSECaNOBWfunvfsMkt0: '100',
      price_1KQrxUSECaNOBWfuI9dsdW1V: '200',
      price_1KQrxjSECaNOBWfuikassI98: '500',
    },
    yearly: {
      price_1KQruISECaNOBWfua864FODB: '25',
      price_1KQrubSECaNOBWfuG2B0u69A: '50',
      price_1KQrtNSECaNOBWfup2STfdDI: '100',
      price_1KQrtvSECaNOBWfuU7EMn7Pj: '200',
      price_1KQrtdSECaNOBWfuEgOHsAJg: '500',
    },
  },
  brl: {
    monthly: {
      price_1KOrs0SECaNOBWfucXPpmhLK: '25',
      price_1KOrs0SECaNOBWfuLL3onTKn: '50',
      price_1KOrs0SECaNOBWfu5M6JdqDX: '100',
      price_1KOrs0SECaNOBWfuvPrNrg75: '200',
      price_1KOrs0SECaNOBWfu4CoVWjQF: '500',
    },
    quarterly: {
      price_1KQrvLSECaNOBWfuEfXIIE7d: '25',
      price_1KQrvXSECaNOBWfuSMEuXevW: '50',
      price_1KQrvrSECaNOBWfunvfsMkt0: '100',
      price_1KQrxUSECaNOBWfuI9dsdW1V: '200',
      price_1KQrxjSECaNOBWfuikassI98: '500',
    },
    yearly: {
      price_1KQruISECaNOBWfua864FODB: '25',
      price_1KQrubSECaNOBWfuG2B0u69A: '50',
      price_1KQrtNSECaNOBWfup2STfdDI: '100',
      price_1KQrtvSECaNOBWfuU7EMn7Pj: '200',
      price_1KQrtdSECaNOBWfuEgOHsAJg: '500',
    },
  },
};

export const ONE_TIME_PAYMENT_AMOUNTS = {
  usd: ['25', '50', '100', '200'],
  aud: ['30', '60', '100', '200'],
  eur: ['15', '40', '80', '150'],
  gbp: ['15', '30', '60', '100'],
  krw: ['20', '50', '100', '200'],
  nzd: ['50', '100', '200', '500'],
  thb: ['500', '1000', '2000', '5000'],
  jpy: ['2000', '5000', '10000', '20000'],
  brl: ['80', '200', '400', '800'],
  cad: ['20', '70', '100', '200'],
};

export const SALUTATIONS = {
  'Mr.': 'Mr.',
  'Mrs.': 'Mrs.',
  'Mr. and Mrs.': 'Mr. and Mrs.',
  'Ms.': 'Ms.',
  'Miss.': 'Miss.',
  'Dr.': 'Dr.',
};

export const AMOUNT_SELECTION_FORM_DEFAULT = {
  currency: 'usd',
  paymentType: 'oneTime',
  amount: '',
  amountId: '',
  comment: '',
  includeFees: false,
  recurringFrequency: Object.keys(RECURRING_FREQUENCY)[0],
};

export const PERSONAL_INFO_FORM_DEFAULT = {
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
};

export const FORM_DEFAULT = {
  ...AMOUNT_SELECTION_FORM_DEFAULT,
  ...PERSONAL_INFO_FORM_DEFAULT,
};

export const COUNTRIES = countries;

export const STRIPE_FEES = {
  usd: { percent: 2.9, fixed: 0.3 },
  eur: { percent: 2.4, fixed: 0.24 },
  gbp: { percent: 2.4, fixed: 0.2 },
  cad: { percent: 2.9, fixed: 0.3 },
  aud: { percent: 2.9, fixed: 0.3 },
  jpy: { percent: 3.6, fixed: 0 },
  // FIXME: can not find information for the following currencies
  krw: { percent: 2.9, fixed: 0.3 },
  nzd: { percent: 2.9, fixed: 0.3 },
  thb: { percent: 2.9, fixed: 0.3 },
  brl: { percent: 2.9, fixed: 0.3 },
};

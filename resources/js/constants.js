import { countries } from 'countries-list';

export const PAYMENT_TYPES = {
  oneTime: 'oneTime',
  recurring: 'recurring',
};

export const CURRENCIES = {
  usd: '$',
  // eur: '€',
  // gbp: '£',
  // cad: '$',
  // aud: '$',
  // krw: '₩',
  // nzd: '$',
  // thb: '฿',
  // jpy: '¥',
  // brl: '$',
};

export const RECURRING_PAYMENT_AMOUNTS = {
  price_1KOrs0SECaNOBWfucXPpmhLK: '25',
  price_1KOrs0SECaNOBWfuLL3onTKn: '50',
  price_1KOrs0SECaNOBWfu5M6JdqDX: '100',
  price_1KOrs0SECaNOBWfuvPrNrg75: '200',
  price_1KOrs0SECaNOBWfu4CoVWjQF: '500',
};

export const ONE_TIME_PAYMENT_AMOUNTS = {
  usd: ['25', '50', '100', '200'],
  // aud: ['30', '60', '100', '200'],
  // eur: ['15', '40', '80', '150'],
  // gbp: ['15', '30', '60', '100'],
  // krw: ['20', '50', '100', '200'],
  // nzd: ['50', '100', '200', '500'],
  // thb: ['500', '1000', '2000', '5000'],
  // jpy: ['2000', '5000', '10000', '20000'],
  // brl: ['80', '200', '400', '800'],
  // cad: ['20', '70', '100', '200'],
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
  amount: ONE_TIME_PAYMENT_AMOUNTS['usd'][0],
  amountId: 'price_1KOrs0SECaNOBWfucXPpmhLK',
  comment: '',
  includeFees: false,
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
  // FIXME: find and change commented values
  // krw: { percent: 2.9, fixed: 0.3 },
  // nzd: { percent: 2.9, fixed: 0.3 },
  // thb: { percent: 2.9, fixed: 0.3 },
  jpy: { percent: 3.6, fixed: 0 },
  // brl: { percent: 2.9, fixed: 0.3 },
};

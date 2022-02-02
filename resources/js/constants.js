import { countries } from 'countries-list';

export const PAYMENT_TYPES = {
  oneTime: 'oneTime',
  recurring: 'recurring',
};

export const CURRENCIES = {
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
  amount: ONE_TIME_PAYMENT_AMOUNTS['usd'][0],
  comment: '',
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

import {
  CURRENCIES,
  ONE_TIME_PAYMENT_AMOUNTS,
  RECURRING_PAYMENT_AMOUNTS,
} from '../constants.js';

export default () => ({
  name: 'AmountSelection',

  CURRENCIES,
  ONE_TIME_PAYMENT_AMOUNTS,
  RECURRING_PAYMENT_AMOUNTS,

  get currencySymbol() {
    return CURRENCIES[this.form.currency];
  },

  next() {
    this.$store._.hide(['IntroSection', 'AmountSelection', 'PaymentInfo']);
    this.$store._.show(['PersonalInfo']);
  },
});

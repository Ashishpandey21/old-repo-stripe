import {
  CURRENCIES,
  ONE_TIME_PAYMENT_AMOUNTS,
  RECURRING_PAYMENT_AMOUNTS,
} from '../constants.js';
import { calculateStripeFee } from '../libs/payment.js';

export default () => ({
  name: 'AmountSelection',

  CURRENCIES,
  ONE_TIME_PAYMENT_AMOUNTS,
  RECURRING_PAYMENT_AMOUNTS,

  get currencySymbol() {
    return CURRENCIES[this.form.currency];
  },

  get processingFees() {
    return calculateStripeFee(this.form.amount, this.form.currency).fee;
  },

  next() {
    this.$store._.hide(['IntroSection', 'AmountSelection', 'PaymentInfo']);
    this.$store._.show(['PersonalInfo']);
  },
});

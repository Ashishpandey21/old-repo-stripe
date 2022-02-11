import {
  CURRENCIES,
  PAYMENT_TYPES,
  ONE_TIME_PAYMENT_AMOUNTS,
  RECURRING_PAYMENT_AMOUNTS,
} from '../constants.js';
import { calculateStripeFee } from '../libs/payment.js';

export default () => ({
  name: 'AmountSelection',

  CURRENCIES,

  get paymentAmounts() {
    let amounts = [];

    switch (this.form.paymentType) {
      case PAYMENT_TYPES.oneTime:
        amounts = ONE_TIME_PAYMENT_AMOUNTS[this.form.currency];
        break;
      case PAYMENT_TYPES.recurring:
        amounts = RECURRING_PAYMENT_AMOUNTS[this.form.currency];
        break;
    }

    this.form.amount = amounts[0];

    return amounts;
  },

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

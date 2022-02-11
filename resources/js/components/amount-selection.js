import {
  CURRENCIES,
  RECURRING_FREQUENCY,
  ONE_TIME_PAYMENT_AMOUNTS,
  RECURRING_PAYMENT_AMOUNTS,
} from '../constants.js';
import { calculateStripeFee } from '../libs/payment.js';

export default () => ({
  name: 'AmountSelection',

  CURRENCIES,
  RECURRING_FREQUENCY,

  get paymentAmounts() {
    const { currency, recurringFrequency } = this.form;

    const amounts = {
      oneTime: ONE_TIME_PAYMENT_AMOUNTS[currency],
      recurring: RECURRING_PAYMENT_AMOUNTS[currency][recurringFrequency],
    };

    // reset the amount values
    this.form.amount = '';
    this.form.amountId = '';

    return amounts;
  },

  get currencySymbol() {
    return CURRENCIES[this.form.currency];
  },

  get processingFees() {
    const fee = calculateStripeFee(this.form.amount, this.form.currency).fee;
    return fee === 'NaN' ? 0.0 : fee;
  },

  next() {
    this.$store._.hide(['IntroSection', 'AmountSelection', 'PaymentInfo']);
    this.$store._.show(['PersonalInfo']);
  },

  clearCheckedRadio() {
    const el = document.querySelector('input[type=radio][name=amount]:checked');
    if (el) {
      el.checked = false;
    }
  },
});

import { CURRENCIES, ONE_TIME_PAYMENT_AMOUNTS } from '../constants.js';

export default () => ({
  name: 'AmountSelection',
  hidden: false,
  disabled: false,

  CURRENCIES,
  ONE_TIME_PAYMENT_AMOUNTS,

  get currencySymbol() {
    return CURRENCIES[this.form.currency];
  },
});

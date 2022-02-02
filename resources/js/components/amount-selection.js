import { makeForm } from '../libs/form.js';
import {
  CURRENCIES,
  ONE_TIME_PAYMENT_AMOUNTS,
  AMOUNT_SELECTION_FORM_DEFAULT,
} from '../constants.js';

export default () => ({
  name: 'AmountSelection',
  hidden: false,

  ...makeForm(AMOUNT_SELECTION_FORM_DEFAULT),

  CURRENCIES,
  ONE_TIME_PAYMENT_AMOUNTS,

  get currencySymbol() {
    return CURRENCIES[this.form.currency];
  },
});

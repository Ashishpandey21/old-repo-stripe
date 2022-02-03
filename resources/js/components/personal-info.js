import { COUNTRIES, SALUTATIONS } from '../constants.js';
import { createPaymentIntent } from '../libs/payment';

export default () => ({
  name: 'PersonalInfo',
  COUNTRIES,
  SALUTATIONS,

  next() {
    if (this.validateAll(this.$refs.form)) {
      this.$store._.hide(['IntroSection', 'AmountSelection', 'PersonalInfo']);
      this.$store._.show(['PaymentInfo']);
    }
  },

  previous() {
    this.$store._.show(['IntroSection', 'AmountSelection']);
    this.$store._.hide(['PaymentInfo', 'PersonalInfo']);
  },
});

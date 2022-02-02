import { COUNTRIES, SALUTATIONS } from '../constants.js';

export default () => ({
  name: 'PersonalInfo',
  COUNTRIES,
  SALUTATIONS,

  next() {
    this.$store._.hide(['IntroSection', 'AmountSelection', 'PersonalInfo']);
    this.$store._.show(['PaymentInfo']);
  },

  previous() {
    this.$store._.show(['IntroSection', 'AmountSelection']);
    this.$store._.hide(['PaymentInfo', 'PersonalInfo']);
  },
});

export default () => ({
  name: 'PersonalInfo',

  previous() {
    this.$store._.hide(['IntroSection', 'AmountSelection', 'PaymentInfo']);
    this.$store._.show(['PersonalInfo']);
  },

  get showPaymentForm() {
    if (this.form.paymentType === 'oneTime') {
      return true;
    }

    return this.$store._.customerCreated;
  },
});

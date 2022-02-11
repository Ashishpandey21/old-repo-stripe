export default () => ({
  name: 'PersonalInfo',

  previous() {
    this.$store._.hide(['IntroSection', 'AmountSelection', 'PaymentInfo']);
    this.$store._.show(['PersonalInfo']);
  },

  get showPaymentForm() {
    if (this.form.paymentType === 'oneTime') {
      return this.form.amount !== '';
    }

    if (this.form.paymentType === 'recurring') {
      return this.$store._.customerCreated;
    }

    return false;
  },
});

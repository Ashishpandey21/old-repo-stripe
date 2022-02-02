import Alpine from 'alpinejs';

import AmountSelection from './components/amount-selection.js';
import PersonalInfo from './components/personal-info.js';
import PaymentInfo from './components/payment-info.js';

import { FORM_DEFAULT } from './constants.js';
import { makeForm } from './libs/form.js';

import '../../resources/scss/style.scss';

const Home = (stripePublishableKey) => ({
  stripePublishableKey,
  ...makeForm(FORM_DEFAULT),

  pay() {
    console.log(this.form);
  },
});

// const data = (stripePublishableKey) => ({
//   stripeElement: null,
//   fetchingPaymentIntent: true,
//
//   showPaymentInfo: true,
//
//   // can be: ['donation-type', 'personal-info', 'payment-info']
//   toggleSecState: 'donation-type',
//
//   async init() {
//     this.stripeElement = new PaymentElement(
//       await loadStripe(stripePublishableKey),
//     );
//
//     const mountPaymentElement = async () => {
//       const resp = await createPaymentIntent(
//         'oneTime',
//         this.currency,
//         parseFloat(this.donationAmount),
//       );
//       this.stripeElement.updateSecretKey(resp.client_secret);
//       this.fetchingPaymentIntent = false;
//     };
//
//     /**
//      * Prevent click bombing.
//      * Wait for ${waitFor} seconds before creating a payment intent.
//      * If user changes the payment intent props within those ${waitFor} seconds,
//      * cancel the old request and create a new one.
//      */
//     const waitFor = 1 * 1000;
//     let requestTimeoutId = null;
//
//     const queueCreatePaymentIntentRequest = () => {
//       this.fetchingPaymentIntent = true;
//       if (!!requestTimeoutId) clearTimeout(requestTimeoutId);
//       requestTimeoutId = setTimeout(mountPaymentElement, waitFor);
//     };
//
//     this.$watch('donationAmount', () => {
//       if (this.donationType === 'oneTime') {
//         queueCreatePaymentIntentRequest();
//       }
//     });
//
//     this.$watch('donationType', () => {
//       this.showPaymentInfo = this.donationType === 'oneTime';
//     });
//
//     mountPaymentElement();
//
//     console.info('data -- instantiated');
//   },
//
//   validateForm(formName) {
//     // FIXME: validate the input fields
//     console.log(`data -- validating ${formName}`);
//   },
//
//   resetForm() {
//     this.$refs.paymentForm.reset();
//     this.stripeElement.clear();
//
//     const { currency, donationType, donationAmount } = initialState();
//     this.currency = currency;
//     this.donationType = donationType;
//     this.donationAmount = donationAmount;
//   },
//
//   /**
//    * Show/Hide elements in mobile view.
//    */
//   navigator(navigateTo, forward = true) {
//     switch (navigateTo) {
//       case 'donation-type':
//       case 'personal-info':
//       case 'payment-info':
//         if (forward) this.validateForm(navigateTo);
//         this.toggleSecState = navigateTo;
//         window.scroll(0, 0);
//         break;
//
//       default:
//         throw `data -- Cannot navigate to ${navigateTo}. Invalid navigation key.`;
//     }
//   },
//
//   async submit() {
//     this.$refs.submitButton.disabled = true;
//     await this.capturePayment();
//     this.$refs.submitButton.disabled = false;
//   },
//
//   async capturePayment() {
//     const payload = {
//       payment_method: {
//         card: this.stripeElement.card,
//         billing_details: {
//           address: {
//             city: this.city,
//             country: this.country,
//             line1: this.address1,
//             line2: this.address2,
//             postal_code: this.zipPostalCode,
//             state: this.state,
//           },
//           email: this.email,
//           name: this.fullName,
//           phone: this.phoneNumber,
//         },
//       },
//     };
//
//     const { stripe, secretKey } = this.stripeElement;
//     const { paymentIntent, error } = await stripe.confirmCardPayment(
//       secretKey,
//       payload,
//     );
//
//     if (paymentIntent && paymentIntent.status === 'succeeded') {
//       this.resetForm();
//       showSuccessModal();
//       this.navigator('donation-type');
//       console.info(`data -- payment successfull`);
//     }
//
//     if (error) {
//       // FIXME: handle error states
//       console.error(`data --`, error);
//     }
//
//     console.info('data -- capturing the payment');
//   },
//
//   show(selector) {
//     switch (selector) {
//       case 'personal-info':
//         return true;
//       case 'amount-selection':
//         return true;
//       case 'payment-info':
//         // return this.donationType === 'oneTime';
//         return this.showPaymentInfo;
//     }
//   },
//
//   async createAccount() {
//     this.showPaymentInfo = true;
//     this.fetchingPaymentIntent = true;
//     const intent = await createPaymentIntent(
//       'recurring',
//       this.currency,
//       // FIXME: make this dynamic
//       100000,
//     );
//     const secret = intent.latest_invoice.payment_intent.client_secret;
//     console.log('createAccount -- done');
//     this.stripeElement.updateSecretKey(secret);
//     this.fetchingPaymentIntent = false;
//   },
// });

(() => {
  document.addEventListener('alpine:init', () => {
    Alpine.data('Home', Home);
    Alpine.data('AmountSelection', AmountSelection);
    Alpine.data('PersonalInfo', PersonalInfo);
    Alpine.data('PaymentInfo', PaymentInfo);
  });

  Alpine.start();
})();

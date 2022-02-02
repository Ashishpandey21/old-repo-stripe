import Alpine from 'alpinejs';

import AmountSelection from './components/amount-selection.js';
import PersonalInfo from './components/personal-info.js';
import PaymentInfo from './components/payment-info.js';

import { FORM_DEFAULT } from './constants.js';
import { makeForm } from './libs/form.js';

import '../../resources/scss/style.scss';

const Home = () => ({
  ...makeForm(FORM_DEFAULT),

  submit(ev) {
    this.validateAll(ev.originalTarget);
  },

  pay() {
    // FIXME: implement me
  },
});

(() => {
  document.addEventListener('alpine:init', () => {
    Alpine.data('Home', Home);
    Alpine.data('AmountSelection', AmountSelection);
    Alpine.data('PersonalInfo', PersonalInfo);
    Alpine.data('PaymentInfo', PaymentInfo);
  });

  Alpine.start();
})();

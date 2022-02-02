export default {
  mobileHide: {
    IntroSection: false,
    AmountSelection: false,
    PersonalInfo: true,
    PaymentInfo: true,
  },

  disabled: {
    AmountSelection: false,
    PersonalInfo: false,
    PaymentInfo: false,
  },

  hide(components) {
    components.forEach((component) => {
      if (!component in this.mobileHide) throw `Invalid component ${component}`;
      this.mobileHide[component] = true;
    });
  },

  show(components) {
    components.forEach((component) => {
      if (!component in this.mobileHide) throw `Invalid component ${component}`;
      this.mobileHide[component] = false;
    });
  },

  disable(components) {
    components.forEach((component) => {
      if (!component in this.disabled) throw `Invalid component ${component}`;
      this.disabled[component] = true;
    });
  },

  enable(components) {
    components.forEach((component) => {
      if (!component in this.disabled) throw `Invalid component ${component}`;
      this.disabled[component] = false;
    });
  },
};

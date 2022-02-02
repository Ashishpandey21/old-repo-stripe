import '@kingshott/iodine';

Iodine.addRule('greaterThan', (value, param) => {
  return parseInt(value) > parseInt(param);
});

Iodine.setErrorMessages({
  required: 'This field cannot be empty.',
  email: 'Invalid email address.',
  greaterThan: '[FIELD] amount cannot be less than [PARAM].',
});

const getErrorMessage = (el) => {
  const rules = el.dataset.rules ? JSON.parse(el.dataset.rules) : [];
  const error = Iodine.is(el.value, rules);
  return error === true ? null : Iodine.getErrorMessage(error);
};

export const makeForm = (form = {}, errors = {}) => ({
  form,
  errors,
  hasErrors(key) {
    return key in this.errors && this.errors[key] !== null;
  },
  firstError(key) {
    return this.hasErrors(key) ? this.errors[key] : null;
  },
  validate(el) {
    const name = el.getAttribute('name');
    this.errors[name] = getErrorMessage(el);
    return this.errors[name] === null;
  },
  validateAll(el) {
    let status = true;
    const fields = el.querySelectorAll('[data-rules]');

    fields.forEach((field) => {
      if (this.validate(field) === false) {
        status = false;
      }
    });

    return status;
  },
});

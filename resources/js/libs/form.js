import '@kingshott/iodine';

export const getErrorMessage = (el) => {
  const rules = el.dataset.rules ? JSON.parse(el.dataset.rules) : [];
  const error = Iodine.is(el.value, rules);
  return error === true ? null : Iodine.getErrorMessage(error);
};

export const makeForm = (form = {}, errors = {}) => ({
  form,
  errors,
  hasErrors(key) {
    return key in this.errors;
  },
  firstError(key) {
    return this.hasErrors(key) ? this.errors[key] : null;
  },
  validate(ev) {
    const name = ev.originalTarget.getAttribute('name');
    const error = getErrorMessage(ev.originalTarget);
    if (error !== null) {
      this.errors[name] = getErrorMessage(ev.originalTarget);
    } else {
      delete this.errors[name];
    }
  },
});

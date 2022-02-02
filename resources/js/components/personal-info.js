import { makeForm } from '../libs/form.js';
import {
  COUNTRIES,
  SALUTATIONS,
  PERSONAL_INFO_FORM_DEFAULT,
} from '../constants.js';

export default () => ({
  name: 'PersonalInfo',
  hidden: false,

  ...makeForm(PERSONAL_INFO_FORM_DEFAULT),

  COUNTRIES,
  SALUTATIONS,
});

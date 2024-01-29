import Form from './Form';

import FormInput from './FormInput';

import ErrorMsgs from './ErrorMsgs';
import Button from './Button';
import InputText from './FormInput/InputText';
import InputPassword from './FormInput/InputPassword';
import InputToggleSwitch from './FormInput/InputToggleSwitch';

import {
  INPUT_TEXT,
  INPUT_PASSWORD,
  INPUT_TOGGLE_SWITCH,
  INPUT_CHECKBOX,
} from './constants';

import { type FormState, type FormValues, type FormInputProps } from './types';

import initState from './initState';

// Components
export {
  FormInput,
  ErrorMsgs,
  Button,
  InputText,
  InputPassword,
  InputToggleSwitch,
};

// Constants
export { INPUT_TEXT, INPUT_PASSWORD, INPUT_TOGGLE_SWITCH, INPUT_CHECKBOX };

// Types
export { FormState, FormValues, FormInputProps };

// Utilities
export { initState };

export default Form;

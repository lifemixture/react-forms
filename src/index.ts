import Form from './components/Form';

import FormInput from './components/Form/FormInput';
import ErrorMsgs from './components/Form/ErrorMsgs';
import Button from './components/Form/Button';

import InputText from './components/Form/FormInput/InputText';
import InputPassword from './components/Form/FormInput/InputPassword';
import InputToggleSwitch from './components/Form/FormInput/InputToggleSwitch';

import {
  INPUT_TEXT,
  INPUT_PASSWORD,
  INPUT_TOGGLE_SWITCH,
  INPUT_CHECKBOX,
} from './constants';

import { type FormState, type FormValues, type FormInputProps } from './types';

import initState from './components/Form/initState';

// Components
export {
  Form,
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

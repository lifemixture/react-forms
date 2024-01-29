import { FormInputProps, InputProps } from '../../../types';

import InputText from './InputText';
import InputPassword from './InputPassword';
import InputToggleSwitch from './InputToggleSwitch';

import {
  INPUT_TEXT,
  INPUT_PASSWORD,
  INPUT_TOGGLE_SWITCH,
} from '../../../constants';

import './FormInput.scss';

const FormInput = (props: FormInputProps) => {
  const { type, ...rest } = props;

  const renderInput = () => {
    switch (type) {
      case INPUT_TEXT:
        return <InputText {...(rest as InputProps<string>)} />;

      case INPUT_PASSWORD:
        return <InputPassword {...(rest as InputProps<string>)} />;

      case INPUT_TOGGLE_SWITCH:
        return <InputToggleSwitch {...(rest as InputProps<boolean>)} />;

      default:
        return <div>Type {type} is not supported</div>;
    }
  };

  return <div className="form-input">{renderInput()}</div>;
};

export default FormInput;

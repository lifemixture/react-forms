import { useState } from 'react';

import wrapInputText from '../wrapInputText';
import { INPUT_TEXT } from '../../../../constants';
import { BaseInputProps } from '../../../../types';

import './InputText.scss';

const defaultProps = {
  title: '',
  id: '',
  value: '',
  defaultValue: '',
  isDirty: false,
  placeholder: '',
  autoComplete: 'off',
  autoFocus: false,
  onChange: () => {},
  onDirty: () => {},
};

const InputText = wrapInputText((props: BaseInputProps<string>) => {
  const {
    title,
    id,
    value,
    isDirty,
    placeholder,
    autoComplete,
    autoFocus,
    onChange,
    onDirty,
  } = props;

  const [type] = useState(INPUT_TEXT);

  return (
    <div className="input-text">
      {title ? <label htmlFor={id}>{title}</label> : null}

      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        placeholder={placeholder}
        data-dirty={isDirty.toString()}
        onChange={onChange}
        onBlur={onDirty}
      />
    </div>
  );
}, defaultProps);

export default InputText;

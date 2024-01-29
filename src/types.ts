import { ChangeEvent, ReactNode } from 'react';

// import { INPUT_TEXT, INPUT_PASSWORD, INPUT_TOGGLE_SWITCH } from './constants';

export type InputValue = string | boolean | null;

export type FormValues<T = InputValue> = {
  [inputId: string]: T;
};

export type FormDirtyState = {
  [inputId: string]: boolean;
};

export type FormErrors = {
  [inputId: string]: string[];
};

export type FormValidity = {
  [inputId: string]: boolean;
};

export type FormState = {
  values: FormValues;
  errors: FormErrors;
  isValid: boolean;
  isDirty: boolean;
  inputsDirty: FormDirtyState;
};

export type FormProps = {
  children: ReactNode | ReactNode[];
  className: string;
  onSubmit: (values: FormValues) => void;
  onStateChange: (state: FormState) => void;
};

export type FormInputProps<T = InputValue> = Input<T> & {
  type: InputType;
  validation?: FormInputValidation<T>;
  onChange?: (value: T) => void;
  onDirty?: (isDirty: boolean) => void;
};

export type BaseInputProps<T = InputValue> = Input<T> & {
  value: T;
  isDirty: boolean;
  onChange: (v: ChangeEvent<HTMLInputElement>) => void;
  onDirty: () => void;
};

export type InputProps<T = InputValue> = Input<T> & {
  onChange: (value: T) => void;
  onDirty: (isDirty: boolean) => void;
};

export type FormInputValidation<T = InputValue> = {
  required: boolean;
  rules?: FormInputValidationRule<T>[];
};

export type FormInputValidationRule<T = InputValue> = {
  isValid: (value: T, values: FormValues) => boolean;
  message: string;
};

type Input<T> = {
  title?: string;
  id: string;
  defaultValue?: T;
  placeholder?: string;
  autoComplete?: string;
  autoFocus?: boolean;
};

type InputType = 'text' | 'password' | 'toggleSwitch';

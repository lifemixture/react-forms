import { Children, ReactElement, ReactNode, isValidElement } from 'react';

import FormInput from './FormInput';

import {
  FormDirtyState,
  FormErrors,
  FormInputProps,
  FormState,
  FormValues,
} from './types';

export const isFormInput = (el: ReactElement<FormInputProps>) => (
  el.type === FormInput
);

export const getInputs = (children: ReactNode | ReactNode[]) => {
  return Children.toArray(children)
    .filter((child) => (
      isValidElement<FormInputProps>(child) && isFormInput(child)
    ))
    .map((child) => (child as ReactElement<FormInputProps>).props);
}

export const getDefaultValues = (inputs: FormInputProps[]) => {
  const defaultValues: FormValues = {};

  return inputs.reduce((acc, input) => {
    acc[input.id] = input.defaultValue || null;

    return acc;
  }, defaultValues);
};

export const initDirty = (
  inputs: FormInputProps[],
  value: boolean = false,
) => {
  const state: FormDirtyState = {};

  return inputs.reduce((acc, input) => {
    acc[input.id] = value;

    return acc;
  }, state);
};

export const isFormDirty = (state: FormDirtyState) => {
  return Object.values(state).some(isDirty => isDirty);
};

export const wrapHandler = <T>(
  input: string,
  handler: Function,
  origHandler: Function | undefined,
) => {
  return (...args: T[]) => {
    handler(input, ...args);

    if (origHandler instanceof Function) {
      origHandler(...args);
    }
  }
};

export const getUpdatedState = (
  values: FormValues,
  errors: FormErrors,
  isValid: boolean,
  isDirty: boolean,
): FormState => {
  return { values, errors, isValid, isDirty };
};

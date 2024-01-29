import { Children, ReactElement, ReactNode, isValidElement } from 'react';

import FormInput from './FormInput';

import {
  FormDirtyState,
  FormInputProps,
  FormValues,
  InputValue,
} from './types';

export const isFormInput = (el: ReactElement<FormInputProps>) =>
  el.type === FormInput;

export const getInputs = (children: ReactNode | ReactNode[]) => {
  return Children.toArray(children)
    .filter(
      (child) => isValidElement<FormInputProps>(child) && isFormInput(child)
    )
    .map((child) => (child as ReactElement<FormInputProps>).props);
};

export const getDefaultValues = (inputs: FormInputProps[]) => {
  const defaultValues: FormValues = {};

  return inputs.reduce((acc, input) => {
    acc[input.id] = input.defaultValue || null;

    return acc;
  }, defaultValues);
};

export const initDirty = (inputs: FormInputProps[], value: boolean = false) => {
  const state: FormDirtyState = {};

  return inputs.reduce((acc, input) => {
    acc[input.id] = value;

    return acc;
  }, state);
};

export const isFormDirty = (state: FormDirtyState) => {
  return Object.values(state).some((isDirty) => isDirty);
};

export const wrapHandler = <T>(
  input: string,
  handler: (input: string, value: T) => void,
  origHandler?: (value: T) => void | undefined
) => {
  return (value: T) => {
    handler(input, value);

    if (origHandler instanceof Function) {
      origHandler(value);
    }
  };
};

// In case the child is FormInput element
// wraps its onChange and onDirty events handlers
export const wrapFormInputs = (
  children: React.ReactNode | React.ReactNode[],
  onValuesChangeHandler: (input: string, value: InputValue) => void,
  onDirtyHandler: (input: string, value: boolean) => void
) => {
  return Children.toArray(children).map((child) => {
    if (!(isValidElement<FormInputProps>(child) && isFormInput(child))) {
      return child;
    }

    const props = { ...child.props };

    props.onChange = wrapHandler<InputValue>(
      props.id,
      onValuesChangeHandler,
      props.onChange
    );
    props.onDirty = wrapHandler<boolean>(
      props.id,
      onDirtyHandler,
      props.onDirty
    );

    return { ...child, props };
  });
};

import { FormInputProps, FormState, InputValue } from '../types';
import { initDirty, isFormDirty } from '../components/Form/utils';
import validate from '../components/Form/validate';

type Action = {
  type: string;
  payload:
    | UpdateValuesActionPayload
    | UpdateDirtyStateActionPayload
    | MarkAsDirtyActionPayload;
};

type UpdateValuesActionPayload = {
  input: string;
  val: InputValue;
  inputs: FormInputProps[];
};

type UpdateDirtyStateActionPayload = {
  input: string;
  inputs: FormInputProps[];
  isInputDirty: boolean;
};

type MarkAsDirtyActionPayload = {
  inputs: FormInputProps[];
};

const reducer = (state: FormState, action: Action) => {
  switch (action.type) {
    case 'form/updateValues': {
      const { input, val, inputs } =
        action.payload as UpdateValuesActionPayload;
      const values = { ...state.values, [input]: val };
      const [isValid, errors] = validate(inputs, values);

      return { ...state, values, isValid, errors };
    }
    case 'form/updateDirtyState': {
      const { input, isInputDirty, inputs } =
        action.payload as UpdateDirtyStateActionPayload;
      const inputsDirty = { ...state.inputsDirty, [input]: isInputDirty };
      const isDirty = isFormDirty(inputsDirty);
      const [isValid, errors] = validate(inputs, state.values);

      return { ...state, isValid, errors, inputsDirty, isDirty };
    }
    case 'form/markAsDirty': {
      const { inputs } = action.payload as MarkAsDirtyActionPayload;
      const inputsDirty = initDirty(inputs, true);
      const isDirty = isFormDirty(inputsDirty);
      const [isValid, errors] = validate(inputs, state.values);

      return { ...state, isValid, errors, inputsDirty, isDirty };
    }
    default:
      throw new Error('Unknown action');
  }
};

// action creators

export const updateValues = (
  input: string,
  val: InputValue,
  inputs: FormInputProps[]
) => {
  return {
    type: 'form/updateValues',
    payload: { input, val, inputs },
  };
};

export const updateDirtyState = (
  input: string,
  isInputDirty: boolean,
  inputs: FormInputProps[]
) => {
  return {
    type: 'form/updateDirtyState',
    payload: { input, isInputDirty, inputs },
  };
};

export const markAsDirty = (inputs: FormInputProps[]) => {
  return {
    type: 'form/markAsDirty',
    payload: { inputs },
  };
};

export default reducer;

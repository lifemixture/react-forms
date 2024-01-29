import { getDefaultValues, initDirty } from './utils';
import validate from './validate';

import { FormInputProps, FormState } from './types';

const initState = (inputs: FormInputProps[]): FormState => {
  const values = getDefaultValues(inputs);
  const inputsDirty = initDirty(inputs);
  const isDirty = false;
  const [isValid, errors] = validate(inputs, values);

  return { values, errors, isValid, isDirty, inputsDirty };
};

export default initState;

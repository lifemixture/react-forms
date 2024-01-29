import { getDefaultValues } from './utils';
import validate from './validate';

import {
  FormInputProps,
  FormState,
} from './types';

const initState = (inputs: FormInputProps[]): FormState => {
  const values = getDefaultValues(inputs);
  const isDirty = false;
  const [isValid, errors] = validate(inputs, values);

  return { values, errors, isValid, isDirty };
}

export default initState;

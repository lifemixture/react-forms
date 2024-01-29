import {
  FormErrors,
  FormInputProps,
  FormInputValidation,
  FormValidity,
  FormValues,
  InputValue,
} from '../../types';

const _getInputErrors = (
  validation: FormInputValidation | undefined,
  val: InputValue,
  formValues: FormValues
) => {
  if (!validation) {
    return [];
  }

  if (!val) {
    return validation.required ? ['Field is required'] : [];
  }

  if (!(validation.rules && validation.rules.length)) {
    return [];
  }

  return validation.rules.reduce((acc, rule) => {
    if (!rule.isValid(val, formValues)) {
      acc.push(rule.message);
    }

    return acc;
  }, [] as string[]);
};

const _validateInput = (
  validation: FormInputValidation | undefined,
  val: InputValue,
  formValues: FormValues
): [boolean, string[]] => {
  const errors = _getInputErrors(validation, val, formValues);
  const isValid = !errors.length;

  return [isValid, errors];
};

const _isFormValid = (validity: { [key: string]: boolean }) => {
  return !Object.values(validity).some((isValid) => !isValid);
};

const validate = (
  inputs: FormInputProps[],
  values: FormValues
): [boolean, FormErrors] => {
  const { validity, errors } = inputs.reduce(
    (acc, input) => {
      const [isValid, errors] = _validateInput(
        input.validation,
        values[input.id],
        values
      );

      acc.errors[input.id] = errors;
      acc.validity[input.id] = isValid;

      return acc;
    },
    {
      validity: {} as FormValidity,
      errors: {} as FormErrors,
    }
  );

  const isValid = _isFormValid(validity);

  return [isValid, errors];
};

export default validate;

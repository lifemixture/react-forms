import {
  useCallback,
  Children,
  useState,
  useMemo,
  FormEvent,
  isValidElement,
} from 'react';

import ErrorMsgs from './ErrorMsgs';

import {
  getInputs,
  isFormDirty,
  getDefaultValues,
  initDirty,
  getUpdatedState,
  wrapHandler,
  isFormInput,
} from './utils';

import validate from './validate';

import {
  FormDirtyState,
  FormInputProps,
  FormProps,
  FormValues,
  InputValue,
} from './types';

import './Form.scss';

const Form = (props: FormProps) => {
  const { children, className, onSubmit, onStateChange } = props;

  const inputs = useMemo(() => getInputs(children), [children]);

  const [values, setValues] = useState(() => getDefaultValues(inputs));
  const [inputsDirty, setDirty] = useState(() => initDirty(inputs, false));

  const [isValid, errors] = useMemo(() => validate(inputs, values), [inputs, values]);
  const isDirty = useMemo(() => isFormDirty(inputsDirty), [inputsDirty]);

  const onValuesChangeHandler = useCallback((input: string, val: InputValue) => {
    setValues((s: FormValues) => ({ ...s, [input]: val }));

    const updatedValues = { ...values, [input]: val };
    const [isValid, errors] = validate(inputs, updatedValues);
    const state = getUpdatedState(updatedValues, errors, isValid, isDirty);

    onStateChange(state);
  }, [inputs, values, isDirty, onStateChange]);

  const onDirtyHandler = useCallback((input: string, isDirty: boolean) => {
    setDirty((s: FormDirtyState) => ({ ...s, [input]: isDirty }));

    const updatedInputsDirty = { ...inputsDirty, [input]: isDirty };
    const updatedIsDirty = isFormDirty(updatedInputsDirty);
    const state = getUpdatedState(values, errors, isValid, updatedIsDirty);

    onStateChange(state);
  }, [inputsDirty, values, errors, isValid, onStateChange]);

  const childrenWrapped = useMemo(() => {
    return Children.toArray(children).map((child) => {
      if (!(isValidElement<FormInputProps>(child) && isFormInput(child))) {
        return child;
      }

      const props = { ...child.props };

      props.onChange = wrapHandler(props.id, onValuesChangeHandler, props.onChange);
      props.onDirty = wrapHandler(props.id, onDirtyHandler, props.onDirty);

      return { ...child, props };
    });
  }, [children, onDirtyHandler, onValuesChangeHandler]);

  const markAsDirty = useCallback(() => {
    setDirty(() => initDirty(inputs, true));
  }, [inputs]);

  const onSubmitHandler = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) {
      markAsDirty();

      return;
    }

    onSubmit(values);
  }, [onSubmit, values, isValid, markAsDirty]);

  return (
    <form
      className={`custom-form ${className}`}
      onSubmit={onSubmitHandler}
    >
      {
        childrenWrapped.map((child, index) => {
          if (!(isValidElement<FormInputProps>(child) && isFormInput(child))) {
            return child;
          }

          return (
            <div
              className="form-input-outer"
              key={index}
            >
              { child }

              {
                child.props.validation && inputsDirty[child.props.id]
                  ? <ErrorMsgs errors={errors[child.props.id]} />
                  : null
              }
            </div>
          )
        })
      }
    </form>
  );
};

Form.defaultProps = {
  children: [],
  className: '',
  onSubmit: () => {},
  onStateChange: () => {},
}

export default Form;

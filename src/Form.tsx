import {
  useCallback,
  useMemo,
  FormEvent,
  isValidElement,
  useReducer,
  useEffect,
} from 'react';

import ErrorMsgs from './ErrorMsgs';

import { getInputs, isFormInput, wrapFormInputs } from './utils';

import initState from './initState';

import { FormDirtyState, FormInputProps, FormProps, InputValue } from './types';

import './Form.scss';
import reducer, {
  markAsDirty,
  updateDirtyState,
  updateValues,
} from './reducers/formStateReducer';

const Form = ({
  children = [],
  className = '',
  onSubmit = () => {},
  onStateChange = () => {},
}: FormProps) => {
  const inputs = useMemo(() => getInputs(children), [children]);

  const [{ values, inputsDirty, isValid, errors, isDirty }, dispatch] =
    useReducer(reducer, initState(inputs));

  useEffect(() => {
    onStateChange({ values, inputsDirty, isValid, errors, isDirty });
  }, [values, inputsDirty, isValid, errors, isDirty, onStateChange]);

  const onValuesChangeHandler = useCallback(
    (input: string, val: InputValue) => {
      dispatch(updateValues(input, val, inputs));
    },
    [inputs]
  );

  const onDirtyHandler = useCallback(
    (input: string, isInputDirty: boolean) => {
      dispatch(updateDirtyState(input, isInputDirty, inputs));
    },
    [inputs]
  );

  const onSubmitHandler = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!isValid) {
        dispatch(markAsDirty(inputs));

        return;
      }

      onSubmit(values);
    },
    [onSubmit, values, isValid, inputs]
  );

  return (
    <form className={`custom-form ${className}`} onSubmit={onSubmitHandler}>
      {wrapFormInputs(children, onValuesChangeHandler, onDirtyHandler).map(
        (child) => {
          if (!(isValidElement<FormInputProps>(child) && isFormInput(child))) {
            return child;
          }

          return (
            <div className="form-input-outer" key={child.props.id}>
              {child}

              {child.props.validation &&
              (inputsDirty as FormDirtyState)[child.props.id] ? (
                <ErrorMsgs errors={errors[child.props.id]} />
              ) : null}
            </div>
          );
        }
      )}
    </form>
  );
};

// Form.defaultProps = {
//   children: [],
//   className: '',
//   onSubmit: () => {},
//   onStateChange: () => {},
// };

export default Form;

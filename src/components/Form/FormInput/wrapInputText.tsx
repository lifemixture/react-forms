import { ChangeEvent, ComponentType, useCallback, useState } from 'react';

import { BaseInputProps, InputProps } from '../../../types';

const wrapInputText = (
  Input: ComponentType<BaseInputProps<string>>,
  defaultProps: InputProps<string>
) => {
  const InputBase = (props: InputProps<string>) => {
    const { defaultValue, onChange, onDirty } = props;

    const [value, setValue] = useState(defaultValue || '');
    const [isDirty, setDirty] = useState(false);

    const onChangeHandler = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setValue(value);
        onChange(value);
      },
      [onChange]
    );

    const onDirtyHandler = useCallback(() => {
      if (isDirty) {
        return;
      }

      setDirty(true);
      onDirty(true);
    }, [onDirty, isDirty]);

    return (
      <div className="form-input">
        <Input
          {...props}
          value={value}
          isDirty={isDirty}
          onChange={onChangeHandler}
          onDirty={onDirtyHandler}
        />
      </div>
    );
  };

  InputBase.defaultProps = defaultProps;

  return InputBase;
};

export default wrapInputText;

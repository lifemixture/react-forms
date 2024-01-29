import { ChangeEvent, useCallback, useState } from 'react';

import { InputProps } from '../../../../types';

import './InputToggleSwitch.scss';

const defaultProps = {
  title: '',
  id: '',
  value: false,
  onChange: () => {},
  onDirty: () => {},
};

const InputToggleSwitch = (props: InputProps<boolean>) => {
  const { title, id, defaultValue, onChange, onDirty } = props;

  const [isDirty, setDirty] = useState(false);

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
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
    <div className="toggle-switch">
      <label className="switch">
        <input
          id={id}
          type="checkbox"
          onChange={onChangeHandler}
          onClick={onDirtyHandler}
          defaultChecked={defaultValue}
          name="toggle"
        />

        <span className="slider round"></span>
      </label>

      <div className="toggle-switch-title">{title}</div>
    </div>
  );
};

InputToggleSwitch.defaultProps = defaultProps;

export default InputToggleSwitch;

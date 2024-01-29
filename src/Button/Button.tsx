import { useCallback } from 'react';

import './Button.scss';

type ButtonProps = {
  title: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled: boolean;
  onClick: () => void;
};

const Button = (props: ButtonProps) => {
  const { title, type, disabled, onClick } = props;

  const onClickHandler = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <div className="custom-button">
      <button type={type} disabled={disabled} onClick={onClickHandler}>
        {title}
      </button>
    </div>
  );
};

Button.defaultProps = {
  title: '',
  type: 'button',
  disabled: false,
  onClick: () => {},
};

export default Button;

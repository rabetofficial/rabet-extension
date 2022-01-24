import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import './styles.less';

import { ButtonVariant, ButtonSize } from '../../../models';

type ButtonTypes = {
  disabled?: boolean;
  content: JSX.Element | string;
  variant: ButtonVariant;
  type?: string | any;
  size?: ButtonSize;
  style?: CSSProperties;
  onClick?: () => void;
  className?: string | any;
};
const Button = (props: ButtonTypes) => {
  const {
    type,
    variant,
    size,
    disabled,
    style,
    onClick,
    className,
    content,
  } = props;
  return (
    <button
      type={type}
      disabled={disabled}
      className={classNames(className, `btn-${variant}`, `btn-${size}`)}
      onClick={onClick}
      style={style}
    >
      {content}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
  style: {},
  type: 'button',
  size: '',
  className: '',
};

export default Button;

import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import './styles.less';

import { ButtonSizeType, ButtonVarientTypes } from '../../../staticRes/enum';

type ButtonTypes = {
  disabled?: boolean;
  content: JSX.Element | string;
  variant: ButtonVarientTypes;
  type?: string | any;
  size?: ButtonSizeType;
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
      className={classNames(variant, size, className)}
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

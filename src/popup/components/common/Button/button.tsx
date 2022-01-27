import React, { CSSProperties } from 'react';

import * as S from './styles';

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
    <S.Group className={`${className} ${variant} ${size}`} style={style}>
      <button
        type={type}
        disabled={disabled}
        className="button"
        onClick={onClick}
        style={style}
      >
        {content}
      </button>
    </S.Group>
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

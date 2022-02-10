import React, { CSSProperties } from 'react';

import { ButtonVariant, ButtonSize } from 'popup/models';

import * as S from './styles';

type ButtonTypes = {
  disabled?: boolean;
  content: React.ReactNode;
  variant: ButtonVariant;
  type?: string | any;
  size?: ButtonSize;
  style?: CSSProperties;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
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
    startIcon,
    endIcon,
  } = props;

  return (
    <S.Button
      className={`${className} ${variant} ${size} button`}
      style={style}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {startIcon && (
        <S.BurgerImageStyle>{startIcon}</S.BurgerImageStyle>
      )}
      {content}
      {endIcon && <S.BurgerImageStyle>{endIcon}</S.BurgerImageStyle>}
    </S.Button>
  );
};

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
  style: {},
  type: 'button',
  size: '',
  className: '',
  startIcon: '',
  endIcon: '',
};

export default Button;

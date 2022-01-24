import React from 'react';

import Tooltip from '../../Tooltip';

import * as S from './styles';

const errorBtn = (
  <S.Icon type="button">
    <span className="icon-exclamation-circle" />
  </S.Icon>
);

type AppProps = {
  variant?: 'max' | 'password'
  isError: boolean
  visibleType: string
  toggleVisible: () => void
  setMax?: () => void
}

const InputBtn = ({
  variant, isError, visibleType, toggleVisible, setMax,
}: AppProps) => {
  const generateBtn = () => {
    if (variant === 'password') {
      return (
        <S.Icon type="button" onClick={toggleVisible}>
          <span
            className={visibleType !== 'text' ? 'icon-invisible' : 'icon-visible-eye'}
          />
        </S.Icon>
      );
    }

    if (variant === 'max') {
      return (
        <S.Max type="button">
          <Tooltip trigger="hover" tooltip="Send entire" placement="top">
            <S.MaxIcon
              className="icon-double-arrow-up"
              onClick={setMax}
            />
          </Tooltip>
        </S.Max>
      );
    }

    if (isError) {
      return errorBtn;
    }

    return null;
  };

  return generateBtn();
};

export default InputBtn;

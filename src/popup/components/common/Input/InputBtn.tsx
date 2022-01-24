import React from 'react';

import Tooltip from '../../Tooltip';

import * as S from './styles';

import {
  InputVariantType,
} from '../../../staticRes/enum';

const errorBtn = (
  <S.Icon type="button">
    <span className="icon-exclamation-circle" />
  </S.Icon>
);

type AppProps = {
  variant?: InputVariantType
  isError: boolean
  visibleType: string
  toggleVisible: () => void
  setMax?: () => void
}

const InputBtn = ({
  variant, isError, visibleType, toggleVisible, setMax,
}: AppProps) => {
  const generateBtn = () => {
    if (variant === InputVariantType.Password) {
      return (
        <S.Icon type="button" onClick={toggleVisible}>
          <span
            className={visibleType !== 'text' ? 'icon-invisible' : 'icon-visible-eye'}
          />
        </S.Icon>
      );
    }

    if (variant === InputVariantType.Max) {
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

import React from 'react';

import Tooltip from 'popup/components/common/Tooltip';
import { InputVariant } from 'popup/models';
import InvisibleEye from 'popup/svgs/InvisibleEye';
import VisibleEye from 'popup/svgs/VisibleEye';
import AngleDoubleUp from 'popup/svgs/AngleDoubleUp';
import ExclamationCircle from 'popup/svgs/ExclamationCircle';

import * as S from './styles';

type AppProps = {
  variant?: InputVariant;
  isError: boolean;
  visibleType: string;
  toggleVisible: () => void;
  setMax?: () => void;
};

const InputBtn = ({
  variant,
  isError,
  visibleType,
  toggleVisible,
  setMax,
}: AppProps) => {
  const generateBtn = () => {
    if (variant === 'password') {
      return (
        <S.Icon type="button" onClick={toggleVisible}>
          {visibleType !== 'text' ? (
            <div style={{ marginRight: '-2px' }}>
              <InvisibleEye />
            </div>
          ) : (
            <VisibleEye />
          )}
        </S.Icon>
      );
    }

    if (variant === 'max') {
      return (
        <S.Max type="button">
          <Tooltip tooltip="Send entire" placement="top">
            <S.MaxIcon onClick={setMax}>
              <AngleDoubleUp />
            </S.MaxIcon>
          </Tooltip>
        </S.Max>
      );
    }

    if (isError) {
      return (
        <S.Icon type="button">
          <ExclamationCircle />
        </S.Icon>
      );
    }

    return null;
  };

  return generateBtn();
};

export default InputBtn;

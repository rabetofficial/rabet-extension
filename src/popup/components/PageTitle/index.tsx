import React from 'react';

import Multiply from 'popup/svgs/Multiply';
import LongArrowLeft from 'popup/svgs/LongArrowLeft';
import closeModalAction from 'popup/actions/modal/close';

import * as S from './styles';

type PageTitleTypes = {
  title: String;
  status?: string;
  statusTitle?: String;
  padding?: string;
  isSetting?: boolean;
  onClose?: () => void;
  titleStyle?: string;
  showMultiplyIcon?: boolean;
};

const PageTitle = ({
  title,
  status,
  statusTitle,
  padding,
  isSetting,
  onClose,
  titleStyle,
  showMultiplyIcon,
}: PageTitleTypes) => {
  const closePageTitle = () => {
    closeModalAction();

    if (onClose) {
      onClose();
    }
  };

  const generateTitle = () => {
    if (status) {
      return (
        <S.Status>
          <span />
          {statusTitle}
        </S.Status>
      );
    }

    if (status === 'warn') {
      return (
        <S.Warn>
          <span />
          {statusTitle}
        </S.Warn>
      );
    }

    if (status === 'success') {
      return (
        <S.Success>
          <span />
          {statusTitle}
        </S.Success>
      );
    }

    if (title) {
      return <S.Title className={titleStyle}>{title}</S.Title>;
    }

    return null;
  };

  if (isSetting) {
    return (
      <S.SettingTypeContainer
        style={{
          padding: `${padding}px`,
          paddingRight: !padding ? '10px' : '0px',
        }}
      >
        <S.Icon style={{ marginRight: '8px' }}>
          <span onClick={closePageTitle}>
            <LongArrowLeft />
          </span>
        </S.Icon>
        <div>{generateTitle()}</div>
      </S.SettingTypeContainer>
    );
  }

  return (
    <S.Container
      style={{
        padding: `${padding}px`,
        paddingRight: !padding ? '10px' : '0px',
      }}
    >
      <div>{generateTitle()}</div>

      <S.Icon>
        <span onClick={closePageTitle}>
          {showMultiplyIcon && <Multiply />}
        </span>
      </S.Icon>
    </S.Container>
  );
};

PageTitle.defaultProps = {
  status: '',
  statusTitle: '',
  padding: '',
  isSetting: false,
  onClose: () => {},
  titleStyle: '',
  showMultiplyIcon: true,
};

export default PageTitle;

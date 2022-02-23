/* eslint-disable no-unneeded-ternary */
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import Multiply from 'popup/svgs/Multiply';

import * as S from './styles';

type PageTitleTypes = {
  title: String;
  status?: string;
  statusTitle?: String;
  alreadyLoaded?: any;
  padding?: string;
};

const PageTitle = ({
  title,
  status,
  statusTitle,
  alreadyLoaded,
  padding,
  ...props
}: PageTitleTypes) => {
  const navigate = useNavigate();

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
      return <S.Title>{title}</S.Title>;
    }

    return null;
  };

  const { accounts } = props;

  const handleClose = () => {
    if (accounts.length) {
      return navigate(RouteName.Home, {
        state: {
          alreadyLoaded: alreadyLoaded === undefined ? true : false,
        },
      });
    }

    return navigate(-1);
  };

  return (
    <S.Container
      style={{
        padding: `${padding}px`,
        paddingRight: !padding ? '10px' : '0px',
      }}
    >
      <div>{generateTitle()}</div>

      <S.Icon>
        <span onClick={handleClose}>
          <Multiply />
        </span>
      </S.Icon>
    </S.Container>
  );
};

PageTitle.defaultProps = {
  status: '',
  statusTitle: '',
  alreadyLoaded: '',
  padding: '',
};

export default connect((state) => ({
  accounts: state.accounts,
}))(PageTitle);

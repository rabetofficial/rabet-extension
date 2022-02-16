import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { homePage } from 'popup/staticRes/routes';
import Multiply from 'popup/svgs/Multiply';

import * as S from './styles';

type AppProps = {
  title: string;
  status?: 'success' | 'warn' | null;
  alreadyLoaded?: boolean;
  className?: string;
};

const ExtTitle = ({
  title,
  status,
  alreadyLoaded,
  className,
}: AppProps) => {
  const accounts = useSelector((state) => state.accounts);
  const navigate = useNavigate();

  const generateTitle = () => {
    if (status) {
      return (
        <S.Status className={status}>
          <span />
          {title}
        </S.Status>
      );
    }

    if (title) {
      return <S.Title>{title}</S.Title>;
    }

    return null;
  };

  const handleClose = () => {
    if (accounts.length) {
      return navigate(homePage, {
        state: {
          alreadyLoaded,
        },
      });
    }

    return navigate(-1);
  };

  return (
    <S.Container className={className}>
      <div>{generateTitle()}</div>

      <div className="cursor-pointer" onClick={handleClose}>
        <Multiply />
      </div>
    </S.Container>
  );
};

ExtTitle.defaultProps = {
  status: null,
  alreadyLoaded: false,
  className: '',
};

export default ExtTitle;

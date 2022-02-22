import React from 'react';

import { useNavigate } from 'react-router-dom';
import RouteName from 'popup/staticRes/routes';
import PageTitle from 'popup/components/PageTitle';
import Header from 'popup/components/common/Header';
import AssetsComponent from 'popup/pageComponents/Assets';

const Assets = () => {
  const navigate = useNavigate();

  const handleDelete = ({ code, issuer }) => {
    addAssetAction({ code, issuer, limit: '0' }, navigate);
  };
  const handleClick = () => {
    handleDelete({ code: asset_code, issuer: asset_issuer });
  };
  const handleCancel = () => {
    navigate(RouteName.Home, {
      state: {
        alreadyLoaded: true,
      },
    });
  };

  return (
    <AssetsComponent onClick={handleClick} onCancel={handleCancel}>
      <Header />
      <PageTitle title={`Asset | ${asset_code}`} />
    </AssetsComponent>
  );
};

export default Assets;

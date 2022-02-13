import React from 'react';

import RouteName from 'popup/staticRes/routes';
import { useNavigate } from 'react-router-dom';
import ShowPrivateKeyComponent, {
  FormValues,
} from 'popup/pageComponents/ShowPrivateKey';
import showPrivateKeyAction from 'popup/actions/accounts/showPrivateKey';

const ShowPrivateKey = () => {
  const navigate = useNavigate();

  const onSubmit = async (
    values: FormValues,
  ): Promise<Partial<FormValues>> => {
    const isLogged = await showPrivateKeyAction(values.key);

    if (!isLogged) {
      return { key: 'Incorrect password.' };
    }
    navigate(RouteName.PrivateKey);
    return {};
  };

  const onCancel = () => {
    navigate(RouteName.Home, {
      state: {
        alreadyLoaded: true,
      },
    });
  };
  return (
    <ShowPrivateKeyComponent
      onCancel={onCancel}
      onSubmit={onSubmit}
    />
  );
};

export default ShowPrivateKey;

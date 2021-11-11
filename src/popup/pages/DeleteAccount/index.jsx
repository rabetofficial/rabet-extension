import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import Note from '../../components/Note';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { homePage } from '../../staticRes/routes';
import PageTitle from '../../components/PageTitle';
import currentActiveAccount from '../../utils/activeAccount';
import removeAccountAction from '../../actions/accounts/remove';

import styles from './styles.less';

const message = 'Please note that by clicking on the Delete button all the information for this account will be deleted from the extension. So please make sure you have a backup of the private key for this account.';

const deleteBtn = (
  <>
    <span className="icon-trash" />
    Delete
  </>
);

const DeleteAccount = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(
      homePage,
      {
        state: {
          alreadyLoaded: true,
        },
      },
    );
  };

  const handleDelete = () => {
    const { activeAccount } = currentActiveAccount();
    removeAccountAction(activeAccount.publicKey, navigate);
  };

  return (
    <div>
      <Header />
      <PageTitle title="Delete account" />

      <div className={classNames('content', styles.content)}>
        <Note text={message} variant="warn" />

        <div className={classNames('pure-g justify-end', styles.buttons)}>
          <Button
            variant="btn-default"
            size="btn-medium"
            content="Cancel"
            onClick={handleCancel}
          />

          <Button
            type="button"
            variant="btn-danger"
            size="btn-medium"
            content={deleteBtn}
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;

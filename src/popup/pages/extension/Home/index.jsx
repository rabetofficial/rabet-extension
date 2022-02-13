import classNames from 'classnames';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect, useReducer } from 'react';

import Modal from 'popup/components/Modal';
import Header from 'popup/components/Header';
import shorter from 'popup/../helpers/shorter';
import CopyText from 'popup/components/CopyText';
import showBalance from 'popup/utils/showBalance';
import getData from 'popup/actions/accounts/getData';
import formatCurrency from 'popup/utils/formatCurrency';
import getTotalBalance from 'popup/utils/getTotalBalance';
import intervalAction from 'popup/actions/accounts/interval';
import isOtherConnected from 'popup/utils/isOtherConnected';
import numberWithCommas from 'popup/utils/numberWithCommas';
import currentActiveAccount from 'popup/utils/activeAccount';
import ModalConnectStatus from 'popup/pageComponents/ModalConnectStatus';
import Links from './Links';
import TabList from './TabList';
import LoadingOne from '../../LoadingOne';
import EditNameForm from './EditNameForm';
import DropDownList from './DropDownList';

import styles from './styles.less';

const Home = ({ options, currencies, host }) => {
  const { state } = useLocation();
  const { activeAccount } = currentActiveAccount();

  const { isConnected } = activeAccount;

  const [editName, setEditName] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOtherConnectedState, setIsOtherConnectedState] =
    useState(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    if (!state?.alreadyLoaded) {
      getData(activeAccount.publicKey).then(() => {
        setLoading(false);
      });

      intervalAction(activeAccount.publicKey, true);
    } else {
      setLoading(false);
    }

    setIsOtherConnectedState(
      isOtherConnected(activeAccount.publicKey, host),
    );
  }, [ignored]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const activeCurrency = currencies[options.currency] || {
    value: 0,
    currency: 'USD',
  };

  const balances = activeAccount.balances || [];
  const totalBalance = getTotalBalance(balances, activeCurrency);

  if (loading) {
    return <LoadingOne title="Waiting for network" size={95} />;
  }

  let formattedTotalBalance = '-';

  if (activeAccount.toNativeLoaded) {
    formattedTotalBalance = showBalance(
      numberWithCommas(formatCurrency(totalBalance)),
      activeCurrency.name,
    );
  }

  return (
    <>
      <Header />
      <div className={styles.xlmBox}>
        <div className="pure-g">
          <div className="pure-u">
            <div className={styles.value}>
              {formattedTotalBalance}
              <span
                className={classNames(
                  styles.modalBtn,
                  isConnected
                    ? styles.modalActive
                    : styles.modalInactive,
                )}
                onClick={toggleModal}
              />
            </div>
            <div className={styles.subject}>
              Total ({activeCurrency.name})
            </div>
          </div>
        </div>
      </div>

      <div className={styles.infoBox}>
        <div className="pure-g">
          <EditNameForm
            editName={editName}
            setEditName={setEditName}
          />

          <div className="pure-u-11-12">
            <label className="label-secondary">Address</label>
            <p className={styles.info}>
              <CopyText
                text={activeAccount.publicKey}
                button={shorter(activeAccount.publicKey, 8)}
              />
            </p>
          </div>

          <div className="pure-u-1-12">
            <DropDownList />
          </div>

          <Links />
        </div>
      </div>

      <div style={{ marginTop: '12px' }}>
        <TabList balances={balances} editName={editName} />
      </div>

      {isModalOpen && (
        <Modal
          id="modal"
          title={host}
          isOpen={isModalOpen}
          onClose={toggleModal}
        >
          <ModalConnectStatus
            host={host}
            forceUpdate={forceUpdate}
            toggleModal={toggleModal}
            result={isConnected}
            publicKey={activeAccount.publicKey}
            isOtherConnected={isOtherConnectedState}
          />
          <div />
        </Modal>
      )}
    </>
  );
};

export default connect((state) => ({
  user: state.user,
  host: state.host,
  accounts: state.accounts,
  options: state.options,
  currencies: state.currencies,
}))(Home);

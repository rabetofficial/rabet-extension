import classNames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import getTotalBalance from '../../helpers/getTotalBalance';
import Links from './Links';
import TabList from './TabList';
import DropDownList from './DropDownList';
import shorter from '../../helpers/shorter';
import Header from '../../components/Header';
import LoadingOne from '../LoadingOne';
import CopyText from '../../components/CopyText';
import isConnected from '../../helpers/isConnected';
import showBalance from '../../helpers/showBalance';
import getData from '../../actions/accounts/getData';
import formatCurrency from '../../helpers/formatCurrency';
import intervalAction from '../../actions/accounts/interval';
import currentActiveAccount from '../../helpers/activeAccount';
import ModalConnectStatus from '../../pageComponents/ModalConnectStatus';
import numberWithCommas from '../../helpers/numberWithCommas';
import Modal from '../../components/Modal';

import styles from './styles.less';
import EditNameForm from './EditNameForm';

const Home = ({ options, currencies, history }) => {
  const [host, setHost] = useState(null);
  const [editName, setEditName] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnectedResult, setIsConnectedResult] = useState(undefined);

  useEffect(() => {
    if (!history.location?.state?.alreadyLoaded) {
      const { activeAccount } = currentActiveAccount();

      getData(activeAccount.publicKey).then(() => {
        setLoading(false);
      });

      intervalAction(activeAccount.publicKey, true);
    } else {
      setLoading(false);
    }

    const { activeAccount } = currentActiveAccount();

    isConnected(activeAccount.publicKey)
      .then(({ isConnectedResult: isCon, host: h }) => {
        setHost(h);
        setIsConnectedResult(isCon);
      });
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { activeAccount } = currentActiveAccount();
  const activeCurrency = currencies[options.currency] || { value: 0, currency: 'USD' };

  const balances = activeAccount.balances || [];
  const totalBalance = getTotalBalance(balances, activeCurrency);

  if (loading) {
    return <LoadingOne title="Waiting for network" size={95} />;
  }

  const formattedTotalBalance = showBalance(
    numberWithCommas(formatCurrency(totalBalance)),
    activeCurrency.name,
  );

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
                  isConnectedResult ? styles.modalActive : styles.modalInactive,
                )}
                onClick={toggleModal}
              />
            </div>
            <div className={styles.subject}>
              Total (
              {activeCurrency.name}
              )
            </div>
          </div>
        </div>
      </div>
      <div className={styles.infoBox}>
        <div className="pure-g">
          <EditNameForm editName={editName} setEditName={setEditName} />

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
            toggleModal={toggleModal}
            result={isConnectedResult}
            publicKey={activeAccount.publicKey}
          />
          <div />
        </Modal>
      )}
    </>
  );
};

export default withRouter(connect((state) => ({
  user: state.user,
  accounts: state.accounts,
  options: state.options,
  currencies: state.currencies,
}))(Home));

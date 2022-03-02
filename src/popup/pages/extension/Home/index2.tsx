import React from 'react';
import cn from 'classnames';

import Header from 'popup/components/Header';
import shorter from 'popup/../helpers/shorter';
import CopyText from 'popup/components/CopyText';

import useActiveAccount from 'popup/hooks/useActiveAccount';
import useActiveCurrency from 'popup/hooks/useActiveCurrency';
import useTotalBalance from 'popup/hooks/useTotalBalance';

import styles from './styles.less';

const Home = () => {
  const totalBalance = useTotalBalance();
  const activeCurrency = useActiveCurrency();
  const { assets, isConnected, publicKey } = useActiveAccount();

  return (
    <>
      <Header />
      <div className={styles.xlmBox}>
        <div className="pure-g">
          <div className="pure-u">
            <div className={styles.value}>
              {totalBalance}
              <span
                className={cn(
                  styles.modalBtn,
                  isConnected
                    ? styles.modalActive
                    : styles.modalInactive,
                )}
                onClick={() => {}}
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
          <div className="pure-u-11-12">
            <label className="label-secondary">Address</label>
            <p className={styles.info}>
              <CopyText
                text={publicKey}
                button={shorter(publicKey, 8)}
              />
            </p>
          </div>

          <div className="pure-u-1-12" />
        </div>
      </div>

      <div style={{ marginTop: '12px' }}></div>
    </>
  );
};

export default Home;

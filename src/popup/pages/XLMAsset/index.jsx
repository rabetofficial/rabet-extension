import React from 'react';

import Header from '../../components/Header';
import PageTitle from '../../components/PageTitle';
import logo from '../../../assets/images/stellar-black.png';

import styles from './styles.less';

const XLMAsset = () => (
  <div>
    <Header />
    <PageTitle title="Asset | XLM" />
    <div className="content">
      <div className={styles.circle}>
        <img src={logo} alt="xlm" />
      </div>

      <p className={styles.desc}>
        XLM is the native currency of the network.
        An XLM is the only asset type that can be
        used on the Stellar network that doesn’t
        require an issuer or a trustline. Any account
        can hold XLM. You can trade XLM for other assets in the network
      </p>
    </div>
  </div>
);

export default XLMAsset;

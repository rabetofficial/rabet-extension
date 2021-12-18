import React from 'react';
import PropTypes from 'prop-types';

import PageTitle from '../../../../../components/PageTitle';
import Card from '../../../../../components/Card';
import sampleLogoSrc from '../../../../../../assets/images/question-circle.png';
import arrowIconSrc from '../../../../../../assets/images/arrow-down.svg';
import Button from '../../../../../components/Button';
import { buttonSizes, buttonTypes } from '../../../../../staticRes/enum';
import SwapDetails from '../../../../../pageComponents/SwapDetails';

import styles from '../../confirm.less';

const BasicSwapConfirm = (props) => {
  const path = ['XLM', 'USDC', 'ETH'];

  return (
    <>
      <PageTitle status="success" statusTitle="Main network" />
      <div className="content">

        <div className={styles.account}>
          <div className={styles.accountTitle}>Source account:</div>
          <div className={styles.accountAddress}>GAMM...VS3O</div>
        </div>

        <Card type="card-secondary">
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Confirm Swap</h2>
            <div className={styles.label}>From</div>
            <div className={styles.value}>
              130
              <img src={sampleLogoSrc} alt="lsp" />
              <span>LSP</span>
            </div>

            <img src={arrowIconSrc} className={styles.connector} alt="icon" />

            <div className={styles.label}>To</div>
            <div className={styles.value}>
              13
              <img src={sampleLogoSrc} alt="lsp" />
              <span>USDC</span>
            </div>

            <hr className={styles.hr} />

            <SwapDetails price={1} received={123.5} path={path} />
          </div>
        </Card>

        <div className={styles.buttons}>
          <Button
            type="button"
            variant={buttonTypes.default}
            size={buttonSizes.medium}
            content="Cancel"
          />

          <Button
            type="button"
            variant={buttonTypes.primary}
            size={buttonSizes.medium}
            content="Confirm"
          />
        </div>
      </div>
    </>
  );
};

BasicSwapConfirm.propTypes = {

};

export default BasicSwapConfirm;

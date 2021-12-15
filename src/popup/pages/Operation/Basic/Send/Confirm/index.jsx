import React from 'react';
import PropTypes from 'prop-types';

import PageTitle from '../../../../../components/PageTitle';
import Card from '../../../../../components/Card';

import styles from '../../confirm.less';

const BasicSendConfirm = (props) => (
  <>
    <PageTitle status="success" statusTitle="Main network" />
    <div className="content">

      <div className={styles.account}>
        <div className={styles.accountTitle}>Source account:</div>
        <div className={styles.accountAddress}>GAMM...VS3O</div>
      </div>

      <Card type="card-secondary">
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Confirm Send</h2>
          <div className={styles.label}>Amount</div>
          <div className={styles.value}>
            130
            <span>LSP</span>
          </div>
          <hr className={styles.hr} />
          <div className={styles.label}>To</div>
          <div className={styles.value}>GAMM...VS3O</div>
          <hr className={styles.hr} />
          <div className={styles.label}>Memo</div>
          <div className={styles.value}>--</div>
        </div>
      </Card>

    </div>
  </>
);

BasicSendConfirm.propTypes = {

};

export default BasicSendConfirm;

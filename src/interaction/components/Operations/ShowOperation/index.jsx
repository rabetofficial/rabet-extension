import React from 'react';
import shortid from 'shortid';

import camelToTitleCase from '../../../../helpers/camelToTitle';
import ShowField from './ShowField';

import styles from '../../../views/Confirm/styles.less';

const ShowOperation = ({ operation: op, index }) => {
  const { type, ...other } = op;

  let arr = Object.entries(other);

  if (type === 'setOptions' && op.signer) {
    arr = Object.entries(op.signer);
  }

  if (type === 'changeTrust' && op.line) {
    const { type: tttttp, line, ...others } = op;
    arr = Object.entries({
      ...line,
      ...others,
    });
  }

  return (
    <div className={styles.box} key={shortid.generate()}>
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          #
          {index + 1}
          -
          {camelToTitleCase(type)}
        </div>

        {arr.map((keyValue) => (
          <ShowField keyValue={keyValue} />
        ))}
      </div>
    </div>
  );
};

export default ShowOperation;

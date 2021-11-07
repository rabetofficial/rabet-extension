import React from 'react';
import shortid from 'shortid';

import Card from '../../Card';
import styles from '../../../views/Confirm/styles.less';
import camelToTitleCase from '../../../../helpers/camelToTitle';

import ShowField from './ShowField';

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
      <Card type="card-secondary">
        <h1 className={styles.title}>
          #
          {index + 1}
          {camelToTitleCase(type)}
        </h1>

        {arr.map((keyValue) => (
          <ShowField keyValue={keyValue} />
        ))}
      </Card>
    </div>
  );
};

export default ShowOperation;

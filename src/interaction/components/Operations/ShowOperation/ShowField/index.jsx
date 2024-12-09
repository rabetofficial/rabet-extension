import React from 'react';
import { StrKey } from '@stellar/stellar-sdk';

import showObject from '../../../../utils/showObject';
import styles from '../../../../views/Confirm/styles.less';

const ShowfieldJSX = ({ tKey, value }) => (
  <>
    <div className={styles.cardSubject}>{tKey}</div>

    <p className={styles.cardValue}>{value}</p>
  </>
);

const ShowField = ({ keyValue }) => {
  const { isValidEd25519PublicKey: isPubValid } = StrKey;
  const [key, value] = keyValue;

  const isObject = typeof value === 'object';

  if (!isObject) {
    if (isPubValid(value) && key === 'ed25519PublicKey') {
      return <ShowfieldJSX tKey="publicKey" value={value} />;
    }

    if (!isNaN(value)) {
      return (
        <ShowfieldJSX
          tKey={key}
          value={parseFloat(value, 10).toString()}
        />
      );
    }

    return <ShowfieldJSX tKey={key} value={value} />;
  }

  if (Array.isArray(value) && key === 'path') {
    let str = '[ ';

    for (const oneValue of value) {
      if (Object.values(oneValue)[0]) {
        str = `${str}${Object.values(oneValue)[0]} `;
      }
    }

    str = `${str}]`;

    return <ShowfieldJSX tKey={key} value={str} />;
  }

  return <ShowfieldJSX tKey={key} value={showObject(value)} />;
};

export default ShowField;

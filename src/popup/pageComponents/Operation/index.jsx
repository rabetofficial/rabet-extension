import PropTypes from 'prop-types';
import React, { useState, useEffect, useReducer } from 'react';

import Card from '../../components/Card';
import Button from '../../components/Button';
import SelectOption from '../../components/SelectOption';
import * as operations from '../../staticRes/operations';
import removeOperationAction from '../../actions/operations/remove';
import changeOperationAction from '../../actions/operations/change';

import OfferOps from './OfferOps';
import SignerOps from './SignerOps';
import PaymentOps from './PaymentOps';
import SetOptionOps from './SetOptionOps';
import ThresholdOps from './ThresholdOps';
import AllowTrustOps from './AllowTrustOps';
import ManageDataOps from './ManageDataOps';
import PaymentSendOps from './PaymentSendOps';
import ChangeTrustOps from './ChangeTrustops';
import PaymentReceiveOps from './PaymentReceiveOps';

import styles from './styles.less';

const deleteBtn = (
  <>
    <span className="icon-trash" />
    Delete
  </>
);

const items = [
  { value: operations.payment, label: 'Payment' },
  { value: operations.pathPaymentStrictSend, label: 'Path payment strict send' },
  { value: operations.pathPaymentStrictReceive, label: 'Path payment strict receive' },
  { value: operations.manageBuyOffer, label: 'Manage offer' },
  { value: operations.createPassiveSellOffer, label: 'Manage passive offer' },
  { value: operations.setOptionsInflationDest, label: 'Set options (inflation)' },
  { value: operations.setOptionsClearFlags, label: 'Set options (Clear flag)' },
  { value: operations.setOptionsSetFlags, label: 'Set options (Set flag)' },
  { value: operations.setOptionsMasterWeight, label: 'Set options (Master weight)' },
  { value: operations.setOptionsHomeDomain, label: 'Set options (Home domain)' },
  { value: operations.setOptionsSigner, label: 'Set options (Signer)' },
  { value: operations.setOptionsThreshold, label: 'Set options (Threshold)' },
  { value: operations.changeTrust, label: 'Change trust' },
  { value: operations.allowTrust, label: 'Allow trust' },
  { value: operations.accountMerge, label: 'Account merge' },
  { value: operations.manageData, label: 'Manage data' },
  { value: operations.bumpSequence, label: 'Bump sequence' },
];

const Operation = ({
  id,
  type,
  operations: ops,
  setOperations,
}) => {
  const [selected, setSelected] = useState({});
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const defaultItem = items.find((x) => x.value === type);

    if (type) {
      setSelected(defaultItem);
    }
  }, []);

  const onChange = (e) => {
    forceUpdate();
    changeOperationAction(id, { type: e.value });

    setSelected(e);
  };

  const removeOperation = () => {
    removeOperationAction(id);

    const newOperations = ops.filter((x) => x.id !== id);

    setOperations(newOperations);
  };

  const generateOption = () => {
    if (selected === items[0]) return <PaymentOps id={id} />;
    if (selected === items[1]) return <PaymentSendOps id={id} />;
    if (selected === items[2]) return <PaymentReceiveOps id={id} />;
    if (selected === items[3]) return <OfferOps key="offer1" id={id} type={operations.manageBuyOffer} offer />;
    if (selected === items[4]) return <OfferOps key="offer2" id={id} type={operations.createPassiveSellOffer} offer={false} />;
    if (selected === items[5]) return <SetOptionOps key="Inflation" label="Inflation destination" inputInfo={{ type: 'text', placeholder: 'G…' }} id={id} type={operations.setOptionsInflationDest} />;
    if (selected === items[6]) return <SetOptionOps key="flag1" label="Flag number" inputInfo={{ type: 'number', placeholder: '1' }} id={id} type={operations.setOptionsClearFlags} />;
    if (selected === items[7]) return <SetOptionOps key="flag2" label="Flag number" inputInfo={{ type: 'number', placeholder: '1' }} id={id} type={operations.setOptionsSetFlags} />;
    if (selected === items[8]) return <SetOptionOps key="weight" label="Weight" inputInfo={{ type: 'number', placeholder: '1' }} id={id} type={operations.setOptionsMasterWeight} />;
    if (selected === items[9]) return <SetOptionOps key="domain" label="Domain address" inputInfo={{ type: 'text', placeholder: 'sample.com' }} id={id} type={operations.setOptionsHomeDomain} />;
    if (selected === items[10]) return <SignerOps id={id} />;
    if (selected === items[11]) return <ThresholdOps id={id} />;
    if (selected === items[12]) return <ChangeTrustOps id={id} />;
    if (selected === items[13]) return <AllowTrustOps id={id} />;
    if (selected === items[14]) return <SetOptionOps key="destination" label="Destination" inputInfo={{ type: 'text', placeholder: 'G...' }} id={id} type={operations.accountMerge} />;
    if (selected === items[15]) return <ManageDataOps id={id} />;
    if (selected === items[16]) return <SetOptionOps key="bump" label="Bump to" inputInfo={{ type: 'number', placeholder: '1234' }} id={id} type={operations.bumpSequence} />;
    return <PaymentOps id={id} />;
  };

  return (
    <div className={styles.main}>
      <Card type="card-secondary">
        <SelectOption
          items={items}
          defaultValue={items[0]}
          variant="select-default"
          onChange={onChange}
          selected={selected}
        />

        <div className={styles.ops}>
          {generateOption()}

          <div className={styles.delete}>
            <Button
              type="button"
              variant="btn-danger"
              size="btn-medium"
              content={deleteBtn}
              onClick={removeOperation}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

Operation.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Operation;

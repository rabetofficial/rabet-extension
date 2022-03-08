import React, {
  useState,
  useEffect,
  useReducer,
  Dispatch,
} from 'react';
import styled from 'styled-components';

import Card from 'popup/components/common/Card';
import Button from 'popup/components/common/Button';
import SelectOption from 'popup/components/common/SelectOption';
import * as operations from 'popup/staticRes/operations';
import removeOperationAction from 'popup/actions/operations/remove';
import changeOperationAction from 'popup/actions/operations/change';
import ButtonContainer from 'popup/components/common/ButtonContainer';
import Trash from 'popup/svgs/Trash';
import options from './options';

import OfferOps from './OfferOps';
import SignerOps from './SignerOps';
import PaymentOps from './PaymentOps';
import PaymentSendOps from './PaymentSendOps';
import SetOptionOps from './SetOptionOps';
import ThresholdOps from './ThresholdOps';
import AllowTrustOps from './AllowTrustOps';
import ManageDataOps from './ManageDataOps';
import ChangeTrustOps from './ChangeTrustops';
import PaymentReceiveOps from './PaymentReceiveOps';

const Container = styled.div`
  .ops__option {
    font-size: 15px;
  }
`;

type AppProps = {
  id: string;
  type: string;
  operations: any[];
  setOperations: Dispatch<any>;
};

const Operation = ({
  id,
  type,
  operations: ops,
  setOperations,
}: AppProps) => {
  const [selected, setSelected] = useState({});
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const defaultItem = options.find((x) => x.value === type);

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
    if (selected === options[0]) return <PaymentOps id={id} />;
    if (selected === options[1]) return <PaymentSendOps id={id} />;
    if (selected === options[2]) return <PaymentReceiveOps id={id} />;
    if (selected === options[3])
      return (
        <OfferOps
          key="offer1"
          id={id}
          type={operations.manageBuyOffer}
          offer
        />
      );
    if (selected === options[4])
      return (
        <OfferOps
          key="offer2"
          id={id}
          type={operations.createPassiveSellOffer}
          offer={false}
        />
      );
    if (selected === options[5])
      return (
        <SetOptionOps
          key="Inflation"
          label="Inflation destination"
          inputInfo={{ type: 'text', placeholder: 'G…' }}
          id={id}
          type={operations.setOptionsInflationDest}
        />
      );
    if (selected === options[6])
      return (
        <SetOptionOps
          key="flag1"
          label="Flag number"
          inputInfo={{ type: 'number', placeholder: '1' }}
          id={id}
          type={operations.setOptionsClearFlags}
        />
      );
    if (selected === options[7])
      return (
        <SetOptionOps
          key="flag2"
          label="Flag number"
          inputInfo={{ type: 'number', placeholder: '1' }}
          id={id}
          type={operations.setOptionsSetFlags}
        />
      );
    if (selected === options[8])
      return (
        <SetOptionOps
          key="weight"
          label="Weight"
          inputInfo={{ type: 'number', placeholder: '1' }}
          id={id}
          type={operations.setOptionsMasterWeight}
        />
      );
    if (selected === options[9])
      return (
        <SetOptionOps
          key="domain"
          label="Domain address"
          inputInfo={{ type: 'text', placeholder: 'sample.com' }}
          id={id}
          type={operations.setOptionsHomeDomain}
        />
      );
    if (selected === options[10]) return <SignerOps id={id} />;
    if (selected === options[11]) return <ThresholdOps id={id} />;
    if (selected === options[12]) return <ChangeTrustOps id={id} />;
    if (selected === options[13]) return <AllowTrustOps id={id} />;
    if (selected === options[14])
      return (
        <SetOptionOps
          key="destination"
          label="Destination"
          inputInfo={{ type: 'text', placeholder: 'G...' }}
          id={id}
          type={operations.accountMerge}
        />
      );
    if (selected === options[15]) return <ManageDataOps id={id} />;
    if (selected === options[16])
      return (
        <SetOptionOps
          key="bump"
          label="Bump to"
          inputInfo={{ type: 'number', placeholder: '1234' }}
          id={id}
          type={operations.bumpSequence}
        />
      );
    return <PaymentOps id={id} />;
  };

  return (
    <Container>
      <Card
        type="secondary"
        className="px-[11px] pt-4 pb-[22px] mb-4"
      >
        <SelectOption
          items={options}
          defaultValue={options[0]}
          variant="default"
          onChange={onChange}
          selected={selected}
        />

        <div className="mt-4">
          {generateOption()}

          <ButtonContainer btnSize={102} justify="end" mt={14}>
            <Button
              type="button"
              variant="danger"
              size="medium"
              content="Delete"
              startIcon={<Trash />}
              onClick={removeOperation}
            />
          </ButtonContainer>
        </div>
      </Card>
    </Container>
  );
};

export default Operation;

import React, {
  Dispatch,
  useState,
  useEffect,
  useReducer,
} from 'react';
import styled from 'styled-components';

import Trash from 'popup/svgs/Trash';
import Card from 'popup/components/common/Card';
import { OpType } from 'popup/reducers/transaction';
import Button from 'popup/components/common/Button';
import SelectOption from 'popup/components/common/SelectOption';
import removeOperationAction from 'popup/actions/operations/remove';
import changeOperationAction from 'popup/actions/operations/change';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import options from './options';
import OfferOps from './List/OfferOps';
import SignerOps from './List/SignerOps';
import PaymentOps from './List/PaymentOps';
import ThresholdOps from './List/ThresholdOps';
import SetOptionOps from './List/SetOptionOps';
import AllowTrustOps from './List/AllowTrustOps';
import ManageDataOps from './List/ManageDataOps';
import PaymentSendOps from './List/PaymentSendOps';
import ChangeTrustOps from './List/ChangeTrustops';
import PaymentReceiveOps from './List/PaymentReceiveOps';

const Container = styled.div`
  .ops__option {
    font-size: 15px;
  }
`;

type AppProps = {
  operation: OpType;
  operations: OpType[];
  setOperations: Dispatch<any>;
};

const Operation = ({
  operation,
  operations,
  setOperations,
}: AppProps) => {
  const [selected, setSelected] = useState({
    value: '',
  });
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const defaultItem = options.find(
      (x) => x.value === operation.type,
    );

    if (operation.type) {
      setSelected(defaultItem);
    }
  }, []);

  const onChange = (e) => {
    forceUpdate();
    changeOperationAction(operation.id, { type: e.value });

    setSelected(e);
  };

  const removeOperation = () => {
    removeOperationAction(operation.id);

    const newOperations = operations.filter(
      (x) => x.id !== operation.id,
    );

    setOperations(newOperations);
  };

  const generateOption = () => {
    if (selected.value === options[0].value)
      return <PaymentOps id={operation.id} />;
    if (selected.value === options[1].value)
      return <PaymentSendOps id={operation.id} />;
    if (selected.value === options[2].value)
      return <PaymentReceiveOps id={operation.id} />;
    if (selected.value === options[3].value)
      return <OfferOps key="offer1" id={operation.id} offer />;
    if (selected.value === options[4].value)
      return (
        <OfferOps key="offer2" id={operation.id} offer={false} />
      );
    if (selected.value === options[5].value)
      return (
        <SetOptionOps
          key="Inflation"
          label="Inflation destination"
          inputInfo={{ type: 'text', placeholder: 'G…' }}
          id={operation.id}
          type={options[5].value}
        />
      );
    if (selected.value === options[6].value)
      return (
        <SetOptionOps
          key="flag1"
          label="Flag number"
          inputInfo={{ type: 'number', placeholder: '1' }}
          id={operation.id}
          type={options[6].value}
        />
      );
    if (selected.value === options[7].value)
      return (
        <SetOptionOps
          key="flag2"
          label="Flag number"
          inputInfo={{ type: 'number', placeholder: '1' }}
          id={operation.id}
          type={options[7].value}
        />
      );
    if (selected.value === options[8].value)
      return (
        <SetOptionOps
          key="weight"
          label="Weight"
          inputInfo={{ type: 'number', placeholder: '1' }}
          id={operation.id}
          type={options[8].value}
        />
      );
    if (selected.value === options[9].value)
      return (
        <SetOptionOps
          key="domain"
          label="Domain address"
          inputInfo={{ type: 'text', placeholder: 'sample.com' }}
          id={operation.id}
          type={options[9].value}
        />
      );
    if (selected.value === options[10].value)
      return <SignerOps id={operation.id} />;
    if (selected.value === options[11].value)
      return <ThresholdOps id={operation.id} />;
    if (selected.value === options[12].value)
      return <ChangeTrustOps id={operation.id} />;
    if (selected.value === options[13].value)
      return <AllowTrustOps id={operation.id} />;
    if (selected.value === options[14].value)
      return (
        <SetOptionOps
          key="destination"
          label="Destination"
          inputInfo={{ type: 'text', placeholder: 'G...' }}
          id={operation.id}
          type={options[14].value}
        />
      );
    if (selected.value === options[15].value)
      return <ManageDataOps id={operation.id} />;
    if (selected.value === options[16].value)
      return (
        <SetOptionOps
          key="bump"
          label="Bump to"
          inputInfo={{ type: 'number', placeholder: '1234' }}
          id={operation.id}
          type={options[16].value}
        />
      );
    return <PaymentOps id={operation.id} />;
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

import shortid from 'shortid';
import { Horizon } from 'stellar-sdk';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import React, { useState, useEffect } from 'react';

import PlusBold from 'popup/svgs/PlusBold';
import RouteName from 'popup/staticRes/routes';
import Card from 'popup/components/common/Card';
import Input from 'popup/components/common/Input';
import Button from 'popup/components/common/Button';
import { OpType } from 'popup/reducers/transaction';
import SendButton from 'popup/components/SendButton';
import Operation from 'popup/blocks/Op/Advance/Operations';
import addMemoAction from 'popup/actions/operations/addMemo';
import addOperationAction from 'popup/actions/operations/add';
import clearOperationsAction from 'popup/actions/operations/clear';
import ButtonContainer from 'popup/components/common/ButtonContainer';

const PlusIcon = styled.div`
  svg {
    width: 14px;
    height: 14px;

    path {
      fill: black;
    }
  }
`;

type FormValues = {
  memo: string;
};

const AdvanceOperation = () => {
  const navigate = useNavigate();
  const [operations, setOperations] = useState<OpType[]>([]);

  const addOperation = () => {
    const operation = {
      checked: false,
      id: shortid.generate(),
      type: Horizon.OperationResponseType.payment,
    };

    setOperations([...operations, operation]);
    addOperationAction(operation);
  };

  useEffect(() => {
    clearOperationsAction();
    addOperation();
  }, []);

  const validateForm = async (values: FormValues) => {
    if (values.memo) {
      if (values.memo.length > 28) {
        addMemoAction({
          checked: false,
          text: values.memo,
        });

        return {
          memo: 'Memo should not be more than 28 characters.',
        };
      }

      addMemoAction({
        checked: true,
        text: values.memo,
      });
    }

    return {};
  };

  const handleCancel = () => {
    navigate(RouteName.Home, {
      state: {
        alreadyLoaded: true,
      },
    });
  };

  return (
    <>
      <Button
        variant="outlined"
        size="medium"
        content="Add Operation"
        startIcon={
          <PlusIcon>
            <PlusBold />
          </PlusIcon>
        }
        className="w-full"
        onClick={addOperation}
      />

      <div className="mt-6">
        {operations.map((item) => (
          <div key={item.id}>
            <Operation
              id={item.id}
              type={item.type}
              operations={operations}
              setOperations={setOperations}
            />
          </div>
        ))}

        <Card type="secondary" className="pt-4 pb-[18px] px-[11px]">
          <Form
            onSubmit={() => {}}
            validate={validateForm}
            render={({ submitError, handleSubmit }) => (
              <form
                className="form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <Field name="memo">
                  {({ input, meta }) => (
                    <div className="group">
                      <label className="label-primary">
                        Memo
                        <span className="label-optional">
                          {' '}
                          (optional)
                        </span>
                      </label>
                      <Input
                        type="text"
                        placeholder="Gift"
                        size="medium"
                        styleType="light"
                        input={input}
                        meta={meta}
                      />
                    </div>
                  )}
                </Field>

                {submitError && (
                  <div className="error">{submitError}</div>
                )}
              </form>
            )}
          />
        </Card>

        <ButtonContainer btnSize={100} justify="end" mt={32} gap={10}>
          <Button
            variant="default"
            size="medium"
            content="Back"
            onClick={handleCancel}
          />

          <SendButton />
        </ButtonContainer>
      </div>
    </>
  );
};

export default AdvanceOperation;

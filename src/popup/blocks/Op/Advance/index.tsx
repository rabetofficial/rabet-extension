import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import { useNavigate } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';

import Card from 'popup/components/common/Card';
import ButtonContainer from 'popup/components/common/ButtonContainer';
import Input from 'popup/components/common/Input';
import Button from 'popup/components/common/Button';
import * as route from 'popup/staticRes/routes';
import addMemoAction from 'popup/actions/operations/addMemo';
import addOperationAction from 'popup/actions/operations/add';
import clearOperationsAction from 'popup/actions/operations/clear';
import SendButton from 'popup/components/SendButton';
import Operation from 'popup/blocks/Op/Advance/OperationList';
import PlusBold from 'popup/svgs/PlusBold';

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
  const [operations, setOperations] = useState([]);

  const addOperation = () => {
    const operation = {
      type: 'payment',
      id: shortid.generate(),
    };

    setOperations([...operations, operation]);
    addOperationAction(operation.id);
  };

  useEffect(() => {
    clearOperationsAction();
    addOperation();
  }, []);

  // const onSend = () => {
  //   sendAction(navigate);
  // };

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

  return (
    <>
      <div className="content mt-8">
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
      </div>

      <div className="content mt-6">
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
            validate={(values: FormValues) => validateForm(values)}
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
            onClick={() => {
              navigate(route.homePage, {
                state: {
                  alreadyLoaded: true,
                },
              });
            }}
          />
          <SendButton />
        </ButtonContainer>
      </div>
    </>
  );
};

export default AdvanceOperation;

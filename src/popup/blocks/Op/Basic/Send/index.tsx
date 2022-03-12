import { StrKey } from 'stellar-sdk';
import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import { Usage } from 'popup/models';
import getAccount from 'popup/api/getAccount';
import RouteName from 'popup/staticRes/routes';
import Input from 'popup/components/common/Input';
import getMaxBalance from 'popup/utils/maxBalance';
import Button from 'popup/components/common/Button';
import openModalAction from 'popup/actions/modal/open';
import isTransferable from 'popup/utils/isTransferable';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import controlNumberInput from 'popup/utils/controlNumberInput';
import SelectAssetModal from 'popup/blocks/Op/Basic/SelectAsset';
import isInsufficientAsset from 'popup/utils/isInsufficientAsset';
import BasicConfirmSend from 'popup/blocks/Op/Basic/Confirm/Send';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import ModalInput from './styles';

type FormValues = {
  memo: string;
  amount: string;
  destination: string;
};

type AppProps = {
  usage: Usage;
};

const BasicSend = ({ usage }: AppProps) => {
  const navigate = useNavigate();
  const account = useActiveAccount();
  const [isAccountNew, setIsAccountNew] = useState(false);

  const assets = account.assets || [];

  const [selectedAsset, setSelectedAsset] = useState(assets[0]);

  const handleCancel = () => {
    navigate(RouteName.Home, {
      state: {
        alreadyLoaded: true,
      },
    });
  };

  const onSubmit = async (v: FormValues) => {
    const values = {
      ...v,
      asset: selectedAsset,
      isAccountNew,
    };

    if (usage === 'extension') {
      navigate(RouteName.BasicSendConfirm, {
        state: {
          values,
        },
      });
    } else {
      openModalAction({
        title: '',
        isStyled: false,
        size: 'medium',
        padding: 'medium',
        minHeight: 0,
        children: (
          <div className="px-8 pt-8 pb-[14px] min-h-[490px]">
            <BasicConfirmSend usage="desktop" values={values} />
          </div>
        ),
      });
    }
  };

  const validateForm = async (v: FormValues) => {
    const values = {
      ...v,
      asset: selectedAsset,
    };

    const errors: Partial<FormValues> = {};

    if (values.memo && values.memo.length > 28) {
      errors.memo = 'Memo should not be more than 28 characters';
    }

    if (!values.destination) {
      errors.destination = '';
    } else if (!StrKey.isValidEd25519PublicKey(values.destination)) {
      errors.destination = 'Invalid destination.';
    } else if (!values.asset) {
      errors.destination = 'No asset selected.';
    }

    if (!values.amount) {
      errors.amount = '';
    }

    if (
      !isInsufficientAsset(
        values.asset,
        account.subentry_count,
        values.amount,
      )
    ) {
      let code = 'XLM';

      if (
        values.asset.asset_type !== 'native' &&
        values.asset.asset_type !== 'liquidity_pool_shares'
      ) {
        code = values.asset.asset_code;
      }

      return {
        amount: `Insufficient ${code} balance.`,
      };
    }

    if (Object.keys(errors).length) {
      return errors;
    }

    const destinationAccount = await getAccount(values.destination);
    const [isAllowed, transferResult] = isTransferable(
      values,
      destinationAccount,
    );
    if (!isAllowed && transferResult === 'INACTIVE') {
      return {
        destination: 'Inactive accounts cannot receive tokens.',
      };
    }

    if (!isAllowed && transferResult === 'NO_TRUST') {
      return {
        destination:
          'The destination account does not trust the asset you are attempting to send.',
      };
    }

    if (!isAllowed && transferResult === 'LIMIT_EXCEED') {
      return {
        destination:
          'The destination account balance would exceed the trust of the destination in the asset.',
      };
    }

    setIsAccountNew(transferResult === 'INACTIVE');

    return {};
  };

  return (
    <>
      <Form
        validate={validateForm}
        onSubmit={onSubmit}
        mutators={{
          setMax: (args, state, tools) => {
            tools.changeValue(state, 'amount', () =>
              getMaxBalance(selectedAsset, account),
            );
          },
        }}
        render={({ form, handleSubmit, invalid, pristine }) => (
          <form onSubmit={handleSubmit}>
            <label className="label-primary block mt-4">Amount</label>
            <ModalInput>
              <div className="flex flex-col grow">
                <Field name="amount">
                  {({ input, meta }) => (
                    <Input
                      type="number"
                      placeholder="123"
                      size="medium"
                      input={input}
                      meta={meta}
                      variant="max"
                      styleType="light"
                      setMax={form.mutators.setMax}
                      onKeyPress={controlNumberInput}
                    />
                  )}
                </Field>
              </div>

              <Field name="asset">
                {() => (
                  <SelectAssetModal
                    usage={usage}
                    assets={assets}
                    onChange={setSelectedAsset}
                  />
                )}
              </Field>
            </ModalInput>

            <Field name="destination">
              {({ input, meta }) => (
                <>
                  <label className="label-primary block mt-4">
                    Destination
                  </label>
                  <Input
                    type="text"
                    placeholder="G..."
                    size="medium"
                    styleType="light"
                    input={input}
                    meta={meta}
                  />
                </>
              )}
            </Field>

            <Field name="memo">
              {({ input, meta }) => (
                <>
                  <label className="label-primary block mt-4">
                    Memo
                    <span className="label-optional">
                      {' '}
                      (optional)
                    </span>
                  </label>
                  <Input
                    type="text"
                    placeholder="My friend"
                    size="medium"
                    styleType="light"
                    input={input}
                    meta={meta}
                  />
                </>
              )}
            </Field>

            <ButtonContainer
              btnSize={100}
              justify="end"
              positionStyles={{
                bottom: usage === 'extension' ? '22px' : '32px',
              }}
              mt={40}
            >
              {usage === 'extension' && (
                <Button
                  type="button"
                  variant="default"
                  size="medium"
                  content="Cancel"
                  onClick={handleCancel}
                />
              )}

              <Button
                type="submit"
                variant="primary"
                size="medium"
                content="Send"
                className="mr-[-11px]"
                disabled={invalid || pristine}
              />
            </ButtonContainer>
          </form>
        )}
      />
    </>
  );
};

export default BasicSend;

import React, { useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import Input from 'popup/components/common/Input';
import Button from 'popup/components/common/Button';
import ButtonContainer from 'popup/components/common/ButtonContainer';
import SelectAsset from 'popup/blocks/Op/Basic/SelectAsset';
import { Usage } from 'popup/models';
import isNative from 'popup/utils/isNative';
import matchAsset from 'popup/utils/matchAsset';
import nativeAsset from 'popup/utils/nativeAsset';
import SwapDetail from 'popup/blocks/Op/Basic/Swap/Detail';
import Swap from 'popup/svgs/Swap';
import Rotate from 'popup/svgs/Rotate';

import * as S from './styles';

type FormValues = {
  from: number;
  to: number;
  asset1: any;
  asset2: any;
};

declare global {
  interface Window {
    calculateTo: () => void;
  }
}

type AppProps = {
  usage: Usage;
};

const BasicSwap = ({ usage }: AppProps) => {
  const navigate = useNavigate();

  const balances = Array(5).fill({
    asset_code: 'XLM',
    asset_issuer: '123',
    last_modified_ledger: '234',
    limit: '567',
    is_authorized: false,
    is_authorized_to_maintain_liabilities: true,
    logo: '',
    domain: 'Stellar.org',
    toNative: 1,
  });

  const [balances1, setBalances1] = useState(balances);
  const [balances2, setBalances2] = useState(balances);
  const [selectedAsset1, setSelectedAsset1] = useState(balances[0]);
  const [selectedAsset2, setSelectedAsset2] = useState(balances[0]);
  const [path, setPath] = useState([]);
  const [showSwapInfo, setShowSwapInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [minimumReceived, setMinimumReceived] = useState(0);
  const timeoutRef = useRef();

  const filterAssets = (asset) => {
    let b;

    if (isNative(asset)) {
      b = balances.filter((x) => !nativeAsset(x));
    } else {
      b = balances.filter((x) => !matchAsset(x, asset));
    }

    return b;
  };

  const handleChangeAsset1 = (newAsset) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setSelectedAsset1(newAsset);
    setBalances2(filterAssets(newAsset));

    setTimeout(() => {
      setLoading(true);
      setShowSwapInfo(false);
      ((window as Window) && typeof globalThis).calculateTo();
    }, 150);
  };

  const handleChangeAsset2 = (newAsset) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setSelectedAsset2(newAsset);
    setBalances1(filterAssets(newAsset));
    setShowSwapInfo(false);

    setTimeout(() => {
      setLoading(true);
      setShowSwapInfo(false);
      window.calculateTo();
    }, 150);
  };

  const handleFieldFrom = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    window.calculateTo();
    setShowSwapInfo(false);
  };

  const handleFieldTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = async (v: FormValues) => {
    console.warn(v);
  };

  const validate = (v: FormValues) => {
    console.warn(v);
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      subscription={{ submitting: true, pristine: true }}
      render={({ form, pristine, invalid, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <label className="label-primary block mt-4">From</label>
          <S.ModalInput>
            <div className="flex-col grow">
              <Field name="from">
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
                    onChange={handleFieldFrom}
                  />
                )}
              </Field>
            </div>

            <Field name="asset1">
              {() => (
                <SelectAsset
                  currencies={balances1}
                  onChange={handleChangeAsset1}
                />
              )}
            </Field>
          </S.ModalInput>

          <div className="flex justify-center">
            <Swap />
          </div>

          <label className="label-primary block mt-[-24px]">To</label>
          <S.ModalInput>
            <div className="flex flex-col grow">
              <Field name="to">
                {({ input, meta }) => (
                  <Input
                    type="number"
                    placeholder="123"
                    size="medium"
                    styleType="light"
                    input={input}
                    meta={meta}
                    onChange={handleFieldTo}
                  />
                )}
              </Field>
            </div>

            <Field name="asset2">
              {() => (
                <SelectAsset
                  currencies={balances2}
                  onChange={handleChangeAsset2}
                />
              )}
            </Field>
          </S.ModalInput>

          {invalid && loading ? <p>LOADING</p> : null}

          {showSwapInfo ? (
            <>
              <S.Equivalent>
                1 BTC = 12 ETH
                <Rotate />
              </S.Equivalent>

              <S.Hr />

              <SwapDetail
                form={form}
                path={path}
                asset1={selectedAsset1}
                asset2={selectedAsset2}
                received={{
                  asset: selectedAsset2,
                  minimumReceived,
                }}
              />
            </>
          ) : (
            ''
          )}

          <ButtonContainer
            btnSize={100}
            justify="end"
            positionStyles={{
              bottom: usage === 'extension' ? '22px' : '32px',
            }}
            mt={40}
          >
            <Button
              type="button"
              variant="default"
              size="medium"
              content="Cancel"
              onClick={() => {
                navigate('/', {
                  state: {
                    alreadyLoaded: true,
                  },
                });
              }}
            />

            <Button
              type="submit"
              variant="primary"
              size="medium"
              content="Send"
              disabled={invalid || pristine}
            />
          </ButtonContainer>
        </form>
      )}
    />
  );
};

export default BasicSwap;

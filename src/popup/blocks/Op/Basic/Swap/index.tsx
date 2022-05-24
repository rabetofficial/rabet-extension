import { useNavigate } from 'react-router-dom';
import { Horizon, ServerApi } from 'stellar-sdk';
import React, { useState, useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';

import BN from 'helpers/BN';
import Swap from 'popup/svgs/Swap';
import { Usage } from 'popup/models';
import Rotate from 'popup/svgs/Rotate';
import Loading from 'popup/components/Loading';
import RouteName from 'popup/staticRes/routes';
import getMaxBalance from 'popup/utils/maxBalance';
import Button from 'popup/components/common/Button';
import openModalAction from 'popup/actions/modal/open';
import defaultAssets from 'popup/staticRes/defaultAssets';
import SwapDetail from 'popup/blocks/Op/Basic/Swap/Detail';
import Input from 'popup/components/common/Input/InputHook';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import combineAssets from 'popup/utils/swap/addDefaultAssets';
import controlNumberInput from 'popup/utils/controlNumberInput';
import SelectAssetModal from 'popup/blocks/Op/Basic/SelectAsset';
import isInsufficientAsset from 'popup/utils/isInsufficientAsset';
import BasicConfirmSwap from 'popup/blocks/Op/Basic/Confirm/Swap';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import * as S from './styles';
import validateForm from './validateForm';
import config from '../../../../../config';
import ShowFractional from './ShowFractional';

export type FormValues = {
  path: any[];
  minimumReceived: number;
  to: string;
  from: string;
  asset1: Horizon.BalanceLine;
  asset2: Horizon.BalanceLine;
  lastField: string;
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
  const account = useActiveAccount();
  const [assets] = useState(() => {
    const accountAssets = account.assets || [];

    const assetsPlusDefaultAssets = combineAssets(
      accountAssets,
      defaultAssets,
    );

    return assetsPlusDefaultAssets;
  });

  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSwapInfo, setShowSwapInfo] = useState(false);
  const [minimumReceived, setMinimumReceived] = useState(0);
  const [isRotateActive, setIsRotateActive] = useState(false);
  const [shouldRotate, setShouldRotate] = useState(false);

  const {
    reset,
    trigger,
    control,
    setValue,
    getValues,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid, isValidating },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      to: '',
      from: '',
      asset1: assets[0],
      asset2: assets[1],
      lastField: 'from',
    },
    resolver: (formValues) =>
      validateForm(
        formValues,
        account,
        setValue,
        setLoading,
        setRealData,
        setShowSwapInfo,
      ),
  });

  function setRealData(
    values: FormValues,
    calculatedResult: ServerApi.PaymentPathRecord,
  ) {
    clearErrors('from');
    clearErrors('to');

    setIsRotateActive(false);

    const calculatePath = [
      values.asset1,
      ...calculatedResult.path,
      values.asset2,
    ];
    setPath(calculatePath);

    if (values.lastField === 'from') {
      setValue('to', calculatedResult.destination_amount);

      const minReceived = new BN(calculatedResult.destination_amount)
        .div(100)
        .times(config.MIN_RECEIVED);

      setMinimumReceived(parseFloat(minReceived.toString()));
    } else {
      setValue('from', calculatedResult.source_amount);

      if (
        !isInsufficientAsset(
          values.asset1,
          account.subentry_count,
          values.from,
        )
      ) {
        errors.from = {
          type: 'error',
          message: 'Insufficient amount.',
        };
      }

      const minReceived = new BN(calculatedResult.source_amount)
        .div(100)
        .times(config.MIN_RECEIVED);

      setMinimumReceived(parseFloat(minReceived.toString()));
    }

    setShowSwapInfo(true);
  }

  useEffect(() => {
    trigger();
  }, [useWatch({ name: ['asset1', 'asset2'], control })]);

  const setFromMax = () => {
    const formValues = getValues();
    const maxValue = getMaxBalance(formValues.asset1, account);

    setValue('from', maxValue, {
      shouldValidate: true,
    });
    setValue('to', '0');
  };

  const handleSwapPlaces = () => {
    const { to, from, asset1, asset2 } = getValues();

    setValue('asset1', asset2, {
      shouldValidate: true,
    });
    setValue('asset2', asset1, {
      shouldValidate: true,
    });

    setValue('to', from);
    setValue('from', to);
  };

  const onSubmit = (v: FormValues) => {
    setShowSwapInfo(false);

    const values = {
      ...v,
      path,
      minimumReceived,
    };

    if (usage === 'extension') {
      navigate(RouteName.BasicSwapConfirm, {
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
          <div className="px-8 pt-8 pb-[14px] min-h-[534px]">
            <BasicConfirmSwap usage="desktop" values={values} />
          </div>
        ),
      });
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="label-primary block mt-[12px]">From</label>
      <S.ModalInput>
        <Controller
          name="lastField"
          control={control}
          render={({ field }) => (
            <Input
              invisible
              type="text"
              size="medium"
              value={field.value}
              onChange={field.onChange}
              errorMsg={errors.lastField && errors.lastField.message}
            />
          )}
        />

        <Controller
          name="from"
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              placeholder="123"
              size="medium"
              variant="max"
              value={field.value}
              onChange={(e) => {
                setValue('lastField', 'from');
                field.onChange(e);
              }}
              setMax={setFromMax}
              errorMsg={errors.from && errors.from.message}
              onKeyPress={controlNumberInput}
              styleType="light"
              className="grow"
            />
          )}
        />

        <Controller
          name="asset1"
          control={control}
          render={({ field }) => (
            <SelectAssetModal
              usage={usage}
              valueName="asset1"
              asset={field.value}
              onChange={field.onChange}
              assets={assets}
            />
          )}
        />
      </S.ModalInput>

      <div className="flex justify-center">
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
          onClick={handleSwapPlaces}
        >
          <Swap />
        </div>
      </div>

      <label className="label-primary block mt-[-28px]">To</label>
      <S.ModalInput>
        <Controller
          name="to"
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              placeholder="123"
              size="medium"
              value={field.value}
              onChange={(e) => {
                setValue('lastField', 'to');
                field.onChange(e);
              }}
              errorMsg={errors.to && errors.to.message}
              onKeyPress={controlNumberInput}
              styleType="light"
              className="grow"
            />
          )}
        />

        <Controller
          name="asset2"
          control={control}
          render={({ field }) => (
            <SelectAssetModal
              usage={usage}
              asset={field.value}
              valueName="asset2"
              assets={assets}
              onChange={field.onChange}
            />
          )}
        />
      </S.ModalInput>

      {loading ? (
        <div className="flex justify-center">
          <Loading size={40} className="!p-0" />
        </div>
      ) : (
        ''
      )}

      {showSwapInfo ? (
        <>
          <div className="flex items-center justify-end">
            <div className="mr-1">
              <ShowFractional
                control={control}
                isRotateActive={isRotateActive}
              />
            </div>

            <S.Rotate isRotate={shouldRotate}>
              <span
                onClick={() => {
                  setIsRotateActive(!isRotateActive);
                  setShouldRotate(true);

                  setTimeout(() => {
                    setShouldRotate(false);
                  }, 500);
                }}
              >
                <Rotate />
              </span>
            </S.Rotate>
          </div>

          <S.Hr />

          <SwapDetail
            path={path}
            control={control}
            minimumReceived={minimumReceived}
          />
        </>
      ) : (
        ''
      )}

      <ButtonContainer
        btnSize={usage === 'extension' ? 100 : 104}
        justify="end"
        positionStyles={{
          bottom: '32px',
        }}
        mt={40}
      >
        {usage !== 'desktop' ? (
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
            style={{ marginRight: '7px' }}
          />
        ) : (
          ''
        )}

        <Button
          type="submit"
          variant="primary"
          size="medium"
          content="Swap"
          style={{ marginRight: '-12px' }}
          disabled={!isValid || isValidating || !showSwapInfo}
        />
      </ButtonContainer>
    </form>
  );
};

export default BasicSwap;

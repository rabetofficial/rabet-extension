import { Horizon, ServerApi } from 'stellar-sdk';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import React, { useRef, useState, useEffect } from 'react';

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

  const assets = account.assets || [];

  const assetsPlusDefaultAssets = combineAssets(
    assets,
    defaultAssets,
  );

  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSwapInfo, setShowSwapInfo] = useState(false);
  const [minimumReceived, setMinimumReceived] = useState(0);
  const [isRotateActive, setIsRotateActive] = useState(false);
  const [shouldRotate, setShouldRotate] = useState(false);

  const timeoutRef = useRef();

  const {
    reset,
    trigger,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      to: '',
      from: '',
      asset1: assets[0],
      asset2: assetsPlusDefaultAssets[0],
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
    calculatedResult: ServerApi.PaymentPathRecord,
  ) {
    const formValues = getValues();

    setIsRotateActive(false);
    setValue('to', calculatedResult.destination_amount);

    const calculatePath = [
      formValues.asset1,
      ...calculatedResult.path,
      formValues.asset2,
    ];

    const minReceived = new BN(calculatedResult.destination_amount)
      .div(100)
      .times(config.MIN_RECEIVED);

    setMinimumReceived(parseFloat(minReceived.toString()));
    setPath(calculatePath);
    setShowSwapInfo(true);
  }

  useEffect(() => {
    trigger();
  }, []);

  const setFromMax = () => {
    const formValues = getValues();
    const maxValue = getMaxBalance(formValues.asset1, account);

    setValue('from', maxValue, {
      shouldValidate: true,
    });
    setValue('to', '0');
  };

  const handleSwapPlaces = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

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

  const onSubmit = async (v: FormValues) => {
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
    setShowSwapInfo(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="label-primary block mt-4">From</label>
      <S.ModalInput>
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
              onChange={field.onChange}
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
              assets={assetsPlusDefaultAssets}
            />
          )}
        />
      </S.ModalInput>

      <div className="flex justify-center">
        <span className="cursor-pointer" onClick={handleSwapPlaces}>
          <Swap />
        </span>
      </div>

      <label className="label-primary block mt-[-21px]">To</label>
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
              onChange={field.onChange}
              errorMsg={errors.to}
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
              assets={assetsPlusDefaultAssets}
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
        btnSize={104}
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
          content="Swap"
          style={{ marginRight: '-12px' }}
          disabled={
            !isDirty ||
            !isValid ||
            !showSwapInfo ||
            !!(errors.from && errors.from.message)
          }
        />
      </ButtonContainer>
    </form>
  );
};

export default BasicSwap;

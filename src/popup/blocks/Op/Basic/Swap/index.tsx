import { Horizon } from 'stellar-sdk';
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
import getStrictSend from 'popup/api/getStrictSend';
import openModalAction from 'popup/actions/modal/open';
import isAssetEqual from 'popup/utils/swap/isAssetEqual';
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

  const [asset1, setAsset1] = useState(assets[0]);
  const [asset2, setAsset2] = useState(assetsPlusDefaultAssets[0]);

  const timeoutRef = useRef();

  const {
    reset,
    trigger,
    control,
    setError,
    setValue,
    getValues,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      to: '',
      from: '',
      asset1: assets[0],
      asset2: assetsPlusDefaultAssets[0],
    },
  });

  useEffect(() => {
    trigger();
  }, []);

  const calculate = async () => {
    setIsRotateActive(false);

    const formValues = getValues();

    if (!formValues.asset2) {
      return;
    }

    if (new BN(formValues.from).isNaN()) {
      return;
    }

    clearErrors(['from']);

    if (
      new BN(formValues.from).isLessThanOrEqualTo('0') ||
      new BN(formValues.from).isNaN()
    ) {
      setError('from', {
        type: 'error',
        message: 'Amount must be bigger than 0.',
      });

      return;
    }

    if (
      !isInsufficientAsset(
        formValues.asset1,
        account.subentry_count,
        formValues.from,
      )
    ) {
      setError('from', {
        type: 'error',
        message: 'Insufficient amount.',
      });
    }

    setLoading(true);
    const calculatedResult = await getStrictSend(formValues);
    setLoading(false);

    if (!calculatedResult) {
      setError('from', {
        type: 'error',
        message: 'Could not find a valid path for swap.',
      });

      return;
    }

    if (
      calculatedResult.destination_amount === '0' &&
      !calculatedResult.path.length
    ) {
      setError('from', {
        type: 'error',
        message: 'Could not find an order.',
      });

      return;
    }

    setValue('to', calculatedResult.destination_amount);

    const calculatePath = [
      formValues.asset1,
      ...calculatedResult.path,
      formValues.asset2,
    ];

    const minReceived = new BN(calculatedResult.destination_amount)
      .div(100)
      .times(99.8);

    setMinimumReceived(parseFloat(minReceived.toString()));
    setPath(calculatePath);
    setShowSwapInfo(true);
  };

  const setFromMax = () => {
    clearErrors('from');

    const formValues = getValues();

    const maxValue = getMaxBalance(formValues.asset1, account);

    setValue('from', maxValue);

    if (new BN(maxValue).isNaN()) {
      return;
    }

    if (
      new BN(maxValue).isLessThanOrEqualTo('0') ||
      new BN(maxValue).isNaN()
    ) {
      setError('from', {
        type: 'error',
        message: 'Amount must be bigger than 0.',
      });

      return;
    }

    if (
      !isInsufficientAsset(
        formValues.asset1,
        account.subentry_count,
        maxValue,
      )
    ) {
      setError('from', {
        type: 'error',
        message: 'Insufficient amount.',
      });

      return;
    }

    setValue('to', '0');
    calculate();
  };

  const handleAsset1 = (asset: Horizon.BalanceLine) => {
    const formValues = getValues();

    if (!formValues.asset2) {
      return;
    }

    if (isAssetEqual(asset, formValues.asset2)) {
      setValue('asset2', formValues.asset1);
      setAsset2(formValues.asset1);
    }

    if (
      !isInsufficientAsset(
        asset,
        account.subentry_count,
        formValues.from,
      )
    ) {
      setShowSwapInfo(false);

      setError('from', {
        type: 'error',
        message: 'Insufficient amount.',
      });

      return;
    }

    clearErrors(['to']);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      calculate();
    }, 150);
  };

  const handleAsset2 = (asset: Horizon.BalanceLineAsset) => {
    const formValues = getValues();

    if (isAssetEqual(formValues.asset1, asset)) {
      setValue('asset1', formValues.asset2);
      setAsset1(formValues.asset2);
    }

    clearErrors(['to']);

    if (
      !isInsufficientAsset(
        formValues.asset1,
        account.subentry_count,
        formValues.from,
      )
    ) {
      setError('from', {
        type: 'error',
        message: 'Insufficient amount.',
      });

      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      calculate();
    }, 150);
  };

  const handleFromChange = () => {
    const formValues = getValues();

    if (new BN(formValues.from).isNaN()) {
      setShowSwapInfo(false);

      setValue('to', '');

      return;
    }

    if (
      new BN(formValues.from).isLessThanOrEqualTo('0') ||
      new BN(formValues.from).isNaN()
    ) {
      setError('from', {
        type: 'error',
        message: 'Amount must be bigger than 0.',
      });

      return;
    }

    setValue('to', '0');
    calculate();
  };

  const handleSwapPlaces = () => {
    const { to, from } = getValues();

    if (
      !assets.find(
        (ast) =>
          ast.asset_code === asset2.asset_code &&
          ast.asset_issuer === asset2.asset_issuer,
      )
    ) {
      setValue('asset1', asset1);
      setValue('asset2', asset2);

      setAsset1(asset2);
      setAsset2(asset1);
    }

    setValue('to', from);
    setValue('from', to);

    calculate();
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
              onChange={(e) => {
                field.onChange(e);
                handleFromChange();
              }}
              defaultValue={field.value}
              setMax={setFromMax}
              errorMsg={showSwapInfo.from}
              onKeyPress={controlNumberInput}
              styleType="light"
              className="grow"
            />
          )}
        />

        <Controller
          name="asset1"
          control={control}
          render={() => (
            <SelectAssetModal
              asset={asset1}
              valueName="asset1"
              setValue={setValue}
              assets={assets}
              onChange={handleAsset1}
            />
          )}
        />
      </S.ModalInput>

      <div
        onClick={handleSwapPlaces}
        className="flex justify-center cursor-pointer"
      >
        <Swap />
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
              defaultValue={field.value}
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
          render={() => (
            <SelectAssetModal
              asset={asset2}
              valueName="asset2"
              setValue={setValue}
              assets={assetsPlusDefaultAssets}
              onChange={handleAsset2}
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

            <S.Rotate isRotate={isRotateActive}>
              <Rotate />
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
          content="Swap"
          style={{ marginRight: '-12px' }}
        />
      </ButtonContainer>
    </form>
  );
};

export default BasicSwap;

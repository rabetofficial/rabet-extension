import { Horizon } from 'stellar-sdk';
import { useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import BN from 'helpers/BN';
import Swap from 'popup/svgs/Swap';
import { Usage } from 'popup/models';
import Rotate from 'popup/svgs/Rotate';
import RouteName from 'popup/staticRes/routes';
import matchAsset from 'popup/utils/matchAsset';
import Input from 'popup/components/common/Input';
import getMaxBalance from 'popup/utils/maxBalance';
import Button from 'popup/components/common/Button';
import getStrictSend from 'popup/api/getStrictSend';
import openModalAction from 'popup/actions/modal/open';
import isAssetEqual from 'popup/utils/swap/isAssetEqual';
import defaultAssets from 'popup/staticRes/defaultAssets';
import SwapDetail from 'popup/blocks/Op/Basic/Swap/Detail';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import combineTokens from 'popup/utils/swap/addDefaultAssets';
import controlNumberInput from 'popup/utils/controlNumberInput';
import SelectAssetModal from 'popup/blocks/Op/Basic/SelectAsset';
import isInsufficientAsset from 'popup/utils/isInsufficientAsset';
import BasicConfirmSwap from 'popup/blocks/Op/Basic/Confirm/Swap';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import * as S from './styles';

type FormValues = {
  from: string;
  to: string;
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

  const assetsPlusDefaultAssets = combineTokens(
    assets,
    defaultAssets,
  );

  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSwapInfo, setShowSwapInfo] = useState(false);
  const [minimumReceived, setMinimumReceived] = useState(0);
  const [isRotateActive, setIsRotateActive] = useState(false);

  const [asset1, setAsset1] = useState(null);
  const [asset2, setAsset2] = useState(assetsPlusDefaultAssets[0]);

  const timeoutRef = useRef();

  const {
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
      asset1: assets[0],
      asset2: assetsPlusDefaultAssets[0],
    },
  });

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

    setValue('to', 0);
    calculate();
  };

  const handleAsset1 = (asset) => {
    const formValues = getValues();

    if (!formValues.asset2) {
      return;
    }

    if (isAssetEqual(asset, formValues.asset2)) {
      setValue('asset2', formValues.asset1);
      setAsset2(formValues.asset1);
    }

    if (!isInsufficientAsset(asset, maxXLM, formValues.from)) {
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

  const handleAsset2 = (asset) => {
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

    setValue('to', 0);
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
  };

  const validate = (v: FormValues) => {
    console.warn(v);

    return {};
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="label-primary block mt-4">From</label>
      <S.ModalInput>
        <Controller
          name="from"
          control={control}
          render={({ field }) => (
            <input
              type="number"
              placeholder="123"
              size="medium"
              variant="max"
              onChange={field.onChange}
              defaultValue={field.value}
              hookError={errors.from}
              inputOnChange={handleFromChange}
              setMax={setFromMax}
              errorMsg={errors.from && errors.from.message}
              onKeyPress={controlNumberInput}
            />
          )}
        />
      </S.ModalInput>

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

      <S.ModalInput>
        <Controller
          name="to"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <input
              type="number"
              placeholder="123"
              size="medium"
              defaultValue={field.value}
              onChange={field.onChange}
              hookError={errors.to}
              errorMsg={errors.to && errors.to.message}
            />
          )}
        />
      </S.ModalInput>

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

      {loading ? (
        <div>
          <p>LOADING</p>
        </div>
      ) : (
        ''
      )}

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
            asset1={asset1}
            asset2={asset2}
            received={{
              asset: asset2,
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
        />
      </ButtonContainer>
    </form>
  );
};

export default BasicSwap;

import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Usage } from 'popup/models';
import ArrowDown from 'popup/svgs/ArrowDown';
import RouteName from 'popup/staticRes/routes';
import Card from 'popup/components/common/Card';
import formatBalance from 'popup/utils/formatBalance';
import closeModalAction from 'popup/actions/modal/close';
import ScrollBar from 'popup/components/common/ScrollBar';
import SwapDetails from 'popup/blocks/Op/Basic/Swap/Detail';
import handleAssetImage from 'popup/utils/handleAssetImage';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import basicSwapAction from 'popup/actions/operations/basicSwap';
import {
  openLoadingModal,
  openSucessModal,
  openErrorModal,
} from 'popup/components/Modals';

import * as S from './styles';
import { FormValues } from '../Swap';
import ConfirmLayout from './Layout';

type AppProps = {
  usage: Usage;
  values: FormValues;
};

const BasicConfirmSwap = ({ usage, values }: AppProps) => {
  const navigate = useNavigate();
  const assetImages = useTypedSelector((store) => store.assetImages);

  const handleClick = async () => {
    if (usage === 'desktop') {
      openLoadingModal({});
    } else {
      navigate(RouteName.LoadingNetwork);
    }

    const [isDone, message] = await basicSwapAction(values);

    if (usage === 'extension') {
      navigate(isDone ? RouteName.Sucess : RouteName.Error, {
        state: {
          message,
        },
      });
    } else {
      if (isDone) {
        openSucessModal({
          message,
          onClick: closeModalAction,
        });
      } else {
        openErrorModal({
          message,
          onClick: closeModalAction,
        });
      }
    }
  };

  let asset1Code = 'XLM';
  let asset2Code = 'XLM';

  if (
    values.asset1.asset_type === 'credit_alphanum4' ||
    values.asset1.asset_type === 'credit_alphanum12'
  ) {
    asset1Code = values.asset1.asset_code;
  }

  if (
    values.asset2.asset_type === 'credit_alphanum4' ||
    values.asset2.asset_type === 'credit_alphanum12'
  ) {
    asset2Code = values.asset2.asset_code;
  }

  console.log(values);

  return (
    <ConfirmLayout usage={usage} handleClick={handleClick}>
      <ScrollBar isHidden maxHeight={335}>
        <Card type="secondary" className="px-[11px] py-[16px]">
          <h2 className="text-lg font-medium mb-4">Confirm Swap</h2>
          <S.Label>From</S.Label>
          <S.Value>
            {formatBalance(values.from)}
            <img
              src={handleAssetImage(values.asset1, assetImages)}
              alt={asset1Code}
            />

            <span className="light">{asset1Code}</span>
          </S.Value>

          <div className="my-1">
            <ArrowDown />
          </div>

          <S.Label>To</S.Label>
          <S.Value>
            {formatBalance(values.to)}
            <img
              src={handleAssetImage(values.asset2, assetImages)}
              alt={asset2Code}
            />
            <span className="light">{asset2Code}</span>
          </S.Value>

          <S.Hr />

          <SwapDetails
            values={values}
            path={values.path}
            minimumReceived={values.minimumReceived}
          />
        </Card>
      </ScrollBar>
    </ConfirmLayout>
  );
};

export default BasicConfirmSwap;

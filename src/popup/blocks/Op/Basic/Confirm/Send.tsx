import React from 'react';
import { useNavigate } from 'react-router-dom';

import shorter from 'popup/utils/shorter';
import RouteName from 'popup/staticRes/routes';
import Card from 'popup/components/common/Card';
import { Usage, SendValues } from 'popup/models';
import formatBalance from 'popup/utils/formatBalance';
import CopyText from 'popup/components/common/CopyText';
import handleAssetAlt from 'popup/utils/handleAssetAlt';
import closeModalAction from 'popup/actions/modal/close';
import ScrollBar from 'popup/components/common/ScrollBar';
import handleAssetImage from 'popup/utils/handleAssetImage';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import basicSendAction from 'popup/actions/operations/basicSend';
import {
  openErrorModal,
  openLoadingModal,
  openSucessModal,
} from 'popup/components/Modals';

import * as S from './styles';
import ConfirmLayout from './Layout';

type AppProps = {
  usage: Usage;
  values: SendValues;
};

const BasicConfirmSend = ({ usage, values }: AppProps) => {
  const navigate = useNavigate();
  const assetImages = useTypedSelector((store) => store.assetImages);

  const handleClick = async () => {
    if (usage === 'desktop') {
      openLoadingModal({});
    } else {
      navigate(RouteName.LoadingNetwork);
    }

    const [isDone, message] = await basicSendAction(values);

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

  return (
    <ConfirmLayout usage={usage} handleClick={handleClick}>
      <ScrollBar isHidden maxHeight={292}>
        <Card type="secondary" className="px-[11px] py-[16px]">
          <h2 className="text-lg font-medium mb-4">Confirm Send</h2>
          <S.Label>Amount</S.Label>
          <S.Value>
            {formatBalance(values.amount)}
            <img
              alt={handleAssetAlt(values.asset)}
              src={handleAssetImage(values.asset, assetImages)}
            />

            <span className="light">
              {values.asset.asset_code || 'XLM'}
            </span>
          </S.Value>

          <S.Hr />

          <S.Label>To</S.Label>
          <CopyText
            text={values.destination}
            custom={
              <span className="text-lg font-medium">
                {shorter(values.destination, 4)}
              </span>
            }
          />

          {values.memo ? (
            <>
              <S.Hr />
              <S.Label>Memo</S.Label>
              <S.Value>{values.memo}</S.Value>
            </>
          ) : (
            ''
          )}
        </Card>
      </ScrollBar>
    </ConfirmLayout>
  );
};

export default BasicConfirmSend;

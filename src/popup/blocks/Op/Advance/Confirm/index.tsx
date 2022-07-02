import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Usage } from 'popup/models';
import RouteName from 'popup/staticRes/routes';
import Card from 'popup/components/common/Card';
import sendAction from 'popup/actions/operations/send';
import closeModalAction from 'popup/actions/modal/close';
import operationMapper from 'popup/utils/operationMapper';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import ScrollBar from 'popup/components/common/ScrollBar';

import {
  openErrorModal,
  openLoadingModal,
  openSucessModal,
} from 'popup/components/Modals';

import ShortRightArrow from 'popup/svgs/ShortRightArrow';
import ConfirmLayout from '../../Basic/Confirm/Layout';
import * as S from './styles';

type ConfirmType = {
  usage: Usage;
  onClose: () => void;
};

const Confirm = ({ usage }: ConfirmType) => {
  const navigate = useNavigate();
  const { memo, operations } = useTypedSelector(
    (store) => store.transaction,
  );

  const operationsMapped = operations.map((op) =>
    operationMapper(op),
  );

  const handleConfirm = async () => {
    if (usage === 'desktop') {
      openLoadingModal({});
    } else {
      navigate(RouteName.LoadingNetwork);
    }

    const [isDone, message] = await sendAction();

    if (usage === 'desktop') {
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
    } else {
      navigate(isDone ? RouteName.Sucess : RouteName.Error, {
        state: {
          message,
        },
      });
    }
  };

  return (
    <ConfirmLayout
      handleClick={handleConfirm}
      usage={usage}
      className="px-[11px] py-[16px]"
    >
      <ScrollBar isHidden maxHeight={410}>
        {operationsMapped.map((op, i) => (
          <>
            <Card type="secondary" className="px-3 py-6">
              <S.Title>
                #{i + 1} {op.title}
              </S.Title>

              {op.info.map((infos) => (
                <>
                  <S.ValueTitle>{infos.title} </S.ValueTitle>

                  {infos.title === 'Claimable in' ? (
                    <S.Info>
                      <p>{infos.value[0]}</p>

                      <div className="m-2.5">
                        <ShortRightArrow />
                      </div>

                      <p>{infos.value[1]}</p>
                    </S.Info>
                  ) : (
                    <>
                      <S.Value>{infos.value}</S.Value>
                    </>
                  )}
                </>
              ))}
            </Card>
          </>
        ))}
        {memo.text && (
          <Card type="secondary" className="mt-2 px-3 pb-2">
            <S.ValueTitle>Memo</S.ValueTitle>
            <S.Value>{memo.text}</S.Value>
          </Card>
        )}
      </ScrollBar>
    </ConfirmLayout>
  );
};

export default Confirm;

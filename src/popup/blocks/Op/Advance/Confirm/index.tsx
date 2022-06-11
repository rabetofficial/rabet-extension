import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Usage } from 'popup/models';
import maxText from 'popup/utils/maxText';
import RouteName from 'popup/staticRes/routes';
import Card from 'popup/components/common/Card';
import Button from 'popup/components/common/Button';
import sendAction from 'popup/actions/operations/send';
import CopyText from 'popup/components/common/CopyText';
import closeModalAction from 'popup/actions/modal/close';
import operationMapper from 'popup/utils/operationMapper';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import ScrollBar from 'popup/components/common/ScrollBar';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import {
  openErrorModal,
  openLoadingModal,
  openSucessModal,
} from 'popup/components/Modals';

import * as S from './styles';

type ConfirmType = {
  usage: Usage;
  onClose: () => void;
};

const Confirm = ({ onClose, usage }: ConfirmType) => {
  const navigate = useNavigate();
  const { name, publicKey } = useActiveAccount();
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
    <S.Container>
      <S.Confirm>
        <div>
          <S.Source>
            <S.SourceTitle>Source account:</S.SourceTitle>
            <S.SourceValue>
              <CopyText
                text={publicKey}
                custom={<p>{maxText(name, 12)}</p>}
              />
            </S.SourceValue>
          </S.Source>
          <div className="h-[360px]">
            <ScrollBar isHidden maxHeight={360}>
              {operationsMapped.map((op, i) => (
                <>
                  <Card type="secondary" className="mt-4 px-3 py-6">
                    <S.Title>
                      #{i + 1} {op.title}
                    </S.Title>

                    {op.info.map((infos) => (
                      <>
                        <S.ValueTitle>{infos.title} </S.ValueTitle>
                        <S.Value>{infos.value}</S.Value>
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
          </div>
        </div>
      </S.Confirm>
      <ButtonContainer
        justify="end"
        btnSize={100}
        gap={10}
        mt={16}
        positionStyles={{ bottom: '14px' }}
      >
        <Button
          variant="default"
          size="medium"
          content="Reject"
          onClick={onClose}
        />

        <Button
          variant="primary"
          size="medium"
          content="Confirm"
          onClick={handleConfirm}
        />
      </ButtonContainer>
    </S.Container>
  );
};

export default Confirm;

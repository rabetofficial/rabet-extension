import React from 'react';
import { useNavigate } from 'react-router-dom';

import shorter from 'popup/utils/shorter';
import RouteName from 'popup/staticRes/routes';
import Card from 'popup/components/common/Card';
import PageTitle from 'popup/components/PageTitle';
import Button from 'popup/components/common/Button';
import sendAction from 'popup/actions/operations/send';
import CopyText from 'popup/components/common/CopyText';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import operationMapper from 'popup/utils/operationMapper';
import ButtonContainer from 'popup/components/common/ButtonContainer';
import ExclamationCircle from 'popup/svgs/ExclamationCircle';

import * as S from './styles';

type ConfirmType = { onClose: () => void };
const Confirm = ({ onClose }: ConfirmType) => {
  const navigate = useNavigate();
  const { publicKey } = useActiveAccount();
  const { memo, operations } = useTypedSelector(
    (store) => store.transaction,
  );

  const operationsMapped = operations.map((op) =>
    operationMapper(op),
  );

  const handleConfirm = () => {
    sendAction(navigate);
  };

  return (
    <div className="pt-8 px-8 hidden-scroll">
      <S.Confirm>
        <div>
          <S.Source>
            <S.SourceTitle>Source account:</S.SourceTitle>
            <S.SourceValue>
              <CopyText
                text={publicKey}
                custom={<p>{shorter(publicKey, 5)}</p>}
              />
            </S.SourceValue>
          </S.Source>

          {operationsMapped.map((op) => (
            <Card type="secondary" className="mt-4 px-3 py-6">
              <S.Title>{op.title}</S.Title>

              {op.info.map((infos) => (
                <>
                  <S.ValueTitle>{infos.title} </S.ValueTitle>
                  <S.Value>{infos.value}</S.Value>
                  {/* <p className="error">
                    <ExclamationCircle />
                  </p> */}
                </>
              ))}
            </Card>
          ))}
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
    </div>
  );
};

export default Confirm;

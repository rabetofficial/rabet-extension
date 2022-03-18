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

import * as S from './styles';

const Confirm = () => {
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
    <>
      <S.Confirm className="hidden-scroll content-scroll">
        <PageTitle status="main" statusTitle="mainnet" title="" />

        <div className="content">
          <S.Source>
            <S.SourceTitle>Source account:</S.SourceTitle>
            <S.SourceValue>
              <CopyText
                text={publicKey}
                button={shorter(publicKey, 5)}
              />
            </S.SourceValue>
          </S.Source>

          {operationsMapped.map((op) => (
            <S.Box>
              <Card type="secondary">
                <S.Title>Title</S.Title>
                <S.Title>
                  <S.ValueTitle style={{ margin: '0' }}>
                    {op.title}
                  </S.ValueTitle>

                  {op.info.map((infos) => (
                    <>
                      <S.Value>
                        {infos.title} {infos.value}
                      </S.Value>
                      <p className="error">
                        <span className="icon-exclamation-circle" />
                      </p>
                    </>
                  ))}
                </S.Title>
              </Card>
            </S.Box>
          ))}

          <Card type="secondary">
            <S.Title>Memo</S.Title>
            <S.Value>{memo.text}</S.Value>
          </Card>
        </div>
      </S.Confirm>
      <ButtonContainer justify="end" btnSize={100} gap={10} mt={16}>
        <Button
          variant="default"
          size="medium"
          content="Reject"
          onClick={() => {
            navigate(RouteName.Home, {
              state: {
                alreadyLoaded: true,
              },
            });
          }}
        />

        <Button
          variant="primary"
          size="medium"
          content="Confirm"
          onClick={handleConfirm}
        />
      </ButtonContainer>
    </>
  );
};

export default Confirm;

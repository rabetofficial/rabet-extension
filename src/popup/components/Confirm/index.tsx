import React from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Card from 'popup/components/common/Card';
import shorter from 'popup/../helpers/shorter';
import Button from 'popup/components/common/Button';
import RouteName from 'popup/staticRes/routes';
import CopyText from 'popup/components/common/CopyText';
import PageTitle from 'popup/components/PageTitle';
import sendAction from 'popup/actions/operations/send';
import ButtonContainer from '../common/ButtonContainer';


import * as S from './styles';

const Confirm = ({ options, transaction }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    sendAction(navigate);
  };
 }

  return (
    <>
      <S.Confirm className="hidden-scroll content-scroll">
        <PageTitle
          status={networkStatus}
          statusTitle={network}
          title=""
        />

        <div className="content">
          <S.Source>
            <S.SourceTitle>Source account:</S.SourceTitle>
            <S.SourceValue>
              <CopyText
                text={activeAccount.publicKey}
                button={shorter(activeAccount.publicKey, 5)}
              />
            </S.SourceValue>
          </S.Source>
            <S.Box>
              <Card type="secondary">
                  <S.Title>
                   Title
                  </S.Title>
                  <S.Title>
                    <S.ValueTitle
                      style={{ margin: '0' }}
                    >
                  Ttile  </S.ValueTitle>

                    <S.Value>someValue</S.Value>
                      <p className="error">
                        <span className="icon-exclamation-circle" />
                      </p>
                  </S.Title>
              </Card>
            </S.Box>

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

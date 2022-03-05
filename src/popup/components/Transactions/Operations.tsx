/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { DateTime } from 'luxon';

import createTab from 'popup/utils/createTab';
import * as Icons from 'popup/svgs/TransactionActions';
import transactionLink from 'popup/utils/horizon/transactionLink';

import * as S from './styles';

type TransferTypes = {
  tx: string;
  type: 'send' | 'receive';
  asset_code: string;
  amount: string | number;
  date: string;
};

type SwapTypes = {
  tx: string;
  asset_code1: string;
  asset_code2: string;
  amount1: string | number;
  amount2: string | number;
  date: string;
};

type MultiOperationTypes = {
  tx: string;
  type: 'multi';
  date: string;
};

type SingleOperationTypes = {
  tx: string;
  type: 'single';
  operation_name: string;
  date: string;
};

type OperationTypes = SingleOperationTypes | MultiOperationTypes;

export const TransferTx = ({
  type,
  asset_code,
  amount,
  date,
  tx,
}: TransferTypes) => (
  <div
    onClick={() => {
      createTab(transactionLink(tx));
    }}
  >
    <S.Container>
      <S.MainPart>
        <S.ImgContainer>
          {type === 'send' ? <Icons.Send /> : <Icons.Receive />}
        </S.ImgContainer>
        <S.TextContainer>
          {type === 'send' ? 'Send' : 'Receive'} {amount} {asset_code}
        </S.TextContainer>
      </S.MainPart>
      <S.DateContainer className="xl:mr-[56px] lg:mr-[32px] md:mr-[16px] sm:mr-[10px]">
        {DateTime.fromISO(date).toRelativeCalendar()}
      </S.DateContainer>
    </S.Container>
  </div>
);

export const SwapTx = ({
  asset_code1,
  asset_code2,
  amount1,
  amount2,
  date,
  tx,
}: SwapTypes) => (
  <div
    onClick={() => {
      createTab(transactionLink(tx));
    }}
  >
    <S.Container>
      <S.MainPart>
        <S.ImgContainer>
          <Icons.Swap />
        </S.ImgContainer>
        <S.TextContainer>
          Swap {amount1} {asset_code1}
          <span className="mx-1">
            <Icons.SwapBack />
          </span>
          {amount2} {asset_code2}
        </S.TextContainer>
      </S.MainPart>
      <S.DateContainer className="xl:mr-[56px] lg:mr-[32px] md:mr-[16px] sm:mr-[10px]">
        {DateTime.fromISO(date).toRelativeCalendar()}
      </S.DateContainer>
    </S.Container>
  </div>
);

export const OperationsTx = ({
  type,
  date,
  tx,
  ...props
}: OperationTypes) => {
  let name = 'Multi Operations';

  if (type === 'single') {
    name = props.operation_name
      .split(' ')
      .map((word: string) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <div
      onClick={() => {
        createTab(transactionLink(tx));
      }}
    >
      <S.Container>
        <S.MainPart>
          <S.ImgContainer>
            {type === 'single' ? (
              <Icons.SingleDot />
            ) : (
              <Icons.MultiDots />
            )}
          </S.ImgContainer>
          <S.TextContainer>{name}</S.TextContainer>
        </S.MainPart>

        <S.DateContainer className="xl:mr-[56px] lg:mr-[32px] md:mr-[16px] sm:mr-[10px]">
          {DateTime.fromISO(date).toRelativeCalendar()}
        </S.DateContainer>
      </S.Container>
    </div>
  );
};

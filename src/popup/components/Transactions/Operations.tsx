/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { DateTime } from 'luxon';

import formatBalance from 'popup/utils/formatBalance';
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
  <a href={transactionLink(tx)} target="_blank" rel="noreferrer">
    <S.Container>
      <S.MainPart>
        <S.ImgContainer>
          {type === 'send' ? <Icons.Send /> : <Icons.Receive />}
        </S.ImgContainer>
        <S.TextContainer>
          {type === 'send' ? 'Send' : 'Receive'}{' '}
          {formatBalance(amount.toString())} {asset_code}
        </S.TextContainer>
      </S.MainPart>
      <S.DateContainer className="xl:mr-[56px] lg:mr-[32px] md:mr-[16px] sm:mr-[10px]">
        {DateTime.fromISO(date).toFormat('MMM dd')}
      </S.DateContainer>
    </S.Container>
  </a>
);

export const SwapTx = ({
  asset_code1,
  asset_code2,
  amount1,
  amount2,
  date,
  tx,
}: SwapTypes) => (
  <a href={transactionLink(tx)} target="_blank" rel="noreferrer">
    <S.Container>
      <S.MainPart>
        <S.ImgContainer>
          <Icons.Swap />
        </S.ImgContainer>
        <S.TextContainer>
          Swap {formatBalance(amount1.toString())} {asset_code1}
          <span className="mx-1">
            <Icons.SwapBack />
          </span>
          {formatBalance(amount2.toString())} {asset_code2}
        </S.TextContainer>
      </S.MainPart>
      <S.DateContainer className="xl:mr-[56px] lg:mr-[32px] md:mr-[16px] sm:mr-[10px]">
        {DateTime.fromISO(date).toFormat('MMM dd')}
      </S.DateContainer>
    </S.Container>
  </a>
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
    <a href={transactionLink(tx)} target="_blank" rel="noreferrer">
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
          {DateTime.fromISO(date).toFormat('MMM dd')}
        </S.DateContainer>
      </S.Container>
    </a>
  );
};

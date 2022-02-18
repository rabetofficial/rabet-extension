/* eslint-disable react/destructuring-assignment */
import React from 'react';

import * as Icons from 'popup/svgs/TransactionActions';

import * as S from './styles';
import { Link } from 'react-router-dom';

type TransferTypes = {
  type: 'send' | 'recieve';
  asset_code: string;
  amount: string | number;
  date: string;
};

type SwapTypes = {
  asset_code1: string;
  asset_code2: string;
  amount1: string | number;
  amount2: string | number;
  date: string;
};

type MultiOperationTypes = { type: 'multi'; date: string };

type SingleOperationTypes = {
  type: 'single';
  operation_name: string;
  date: string;
};

type OperationTypes = SingleOperationTypes | MultiOperationTypes;

export const TransferTx = (props: TransferTypes) => {
  const { type, asset_code, amount, date } = props;
  return (
    <S.Container>
      <S.MainPart>
        <S.ImgContainer>
          {type === 'send' ? <Icons.Send /> : <Icons.Recieve />}
        </S.ImgContainer>
        <S.TextContainer>
          <Link to="./">
            {type === 'send' ? 'Send ' : 'Recieve '} {amount}{' '}
            {asset_code}
          </Link>
        </S.TextContainer>
      </S.MainPart>
      <S.DateContainer className="xl:mr-[56px] lg:mr-[32px] md:mr-[16px] sm:mr-[10px]">
        {date}
      </S.DateContainer>
    </S.Container>
  );
};

export const SwapTx = (props: SwapTypes) => {
  const { asset_code1, asset_code2, amount1, amount2, date } = props;
  return (
    <S.Container>
      <S.MainPart>
        <S.ImgContainer>
          <Icons.Swap />
        </S.ImgContainer>
        <Link to="./">
          <S.TextContainer>
            Swap {amount1} {asset_code1}
            <span className="mx-1">
              <Icons.SwapBack />
            </span>
            {amount2} {asset_code2}
          </S.TextContainer>
        </Link>
      </S.MainPart>
      <S.DateContainer className="xl:mr-[56px] lg:mr-[32px] md:mr-[16px] sm:mr-[10px]">
        {date}
      </S.DateContainer>
    </S.Container>
  );
};

export const OperationsTx = (props: OperationTypes) => {
  const { type, date } = props;
  let name = 'Multi Operations';
  if (type === 'single') {
    name = props.operation_name;
  }
  return (
    <S.Container>
      <S.MainPart>
        <S.ImgContainer>
          {type === 'single' ? (
            <Icons.SingleDot />
          ) : (
            <Icons.MultiDots />
          )}
        </S.ImgContainer>
        <S.TextContainer>
          <Link to="./">{name}</Link>
        </S.TextContainer>
      </S.MainPart>

      <S.DateContainer className="xl:mr-[56px] lg:mr-[32px] md:mr-[16px] sm:mr-[10px]">
        {date}
      </S.DateContainer>
    </S.Container>
  );
};

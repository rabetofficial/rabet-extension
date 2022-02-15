import { addBalances } from 'popup/reducers/accounts2';
import React from 'react';
import { Horizon } from 'stellar-sdk';

import sample from '../../../../../../assets/images/stellar-black.png';

import * as S from './styles';

type AssetType = {
  balance: Horizon.BalanceLine;
};

const Asset = ({ balance }: AssetType) => 
  <div className="flex items-center py-[18px]">
    <S.Circle>
      <S.Image src={sample} alt="asset" />
    </S.Circle>
    <div className="flex justify-between items-center w-full">
      <div className="flex flex-col">
        <div className="text-base font-medium">
          {balance.asset_code}
        </div>
        <div className="text-sm text-primary-dark mt-[2px]">XLM</div>
      </div>
      <div className="flex flex-col">
        <div className="text-base font-medium">
          {balance.balance} {balance.asset_code}
        </div>
        <div className="text-sm text-primary-dark mt-[2px]">
          $5.256
        </div>
      </div>
    </div>
  </div>
);

export default Asset;

import React from 'react';

import AddressBlock from './AddressBlock';
import AssetBlock from './AssetBlock';
import HeaderBlock from './HeaderBlock';

import * as S from './styles';

type AppProps = {
  children: React.ReactNode;
};

const ExpandLayout = ({ children }: AppProps) => (
  <S.Container>
    <HeaderBlock />

    <div className="flex flex-row flex-wrap md:space-x-[38px] sm:space-x-0 space-x-0 mt-[23px]">
      <div className="grow md:mb-0 sm:mb-[38px] mb-[38px]">
        <S.CardSimple className="h-full pt-1">
          {children}
        </S.CardSimple>
      </div>

      <div className="lg:basis-[351px] md:basis-2/5 sm:basis-full basis-full space-y-[38px]">
        <AddressBlock />

        <AssetBlock />
      </div>
    </div>
  </S.Container>
);

export default ExpandLayout;

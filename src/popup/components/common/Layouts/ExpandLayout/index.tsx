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

    <div className="flex flex-row space-x-[38px] mt-[23px]">
      <div className="grow">
        <S.Card className="h-full">{children}</S.Card>
      </div>

      <div className="basis-[351px] space-y-[38px]">
        <AddressBlock />

        <AssetBlock />
      </div>
    </div>
  </S.Container>
);

export default ExpandLayout;

import React from 'react';

import FullRabetLogo from 'popup/svgs/FullRabetLogo';

import * as S from './styles';

type AppProps = {
  children: React.ReactNode;
};

const ExpandLayout = ({ children }: AppProps) => (
  <S.Container>
    <div className="flex justify-between">
      <div>
        <FullRabetLogo />
      </div>
      <div>2</div>
    </div>
    <div className="flex flex-row space-x-[38px] mt-[23px]">
      <div className="grow">
        <S.Card>{children}</S.Card>
      </div>
      <div className="basis-[351px]">
        <S.Card>02</S.Card>
      </div>
    </div>
  </S.Container>
);

export default ExpandLayout;

import React from 'react';

import { Tab } from 'popup/models';
import Tabs from 'popup/components/common/Tabs';
import isEmpty from '../../../../../helpers/isEmpty';
import AddressBlock from './AddressBlock';
import AssetBlock from './AssetBlock';
import HeaderBlock from './HeaderBlock';

import * as S from './styles';

type AppProps = {
  children?: React.ReactNode;
  tabItems?: Tab[];
};

const ExpandLayout = ({ children, tabItems = [] }: AppProps) => (
  <S.Container>
    <S.XLResponsive>
      <HeaderBlock />

      <div className="flex flex-row md:flex-nowrap sm:flex-wrap flex-wrap md:space-x-[38px] sm:space-x-0 space-x-0 mt-[23px]">
        <div
          className="grow relative md:mb-0 sm:mb-[38px] mb-[38px]"
          style={{ flexBasis: 'min-content' }}
        >
          <S.CardSimple className="rounded-md h-full pt-1">
            {!isEmpty(tabItems) ? (
              <Tabs data={tabItems} contentClass="px-[20px]" />
            ) : (
              children
            )}
          </S.CardSimple>
        </div>

        <div className="lg:basis-[351px] md:basis-2/5 sm:basis-full basis-full space-y-[38px]">
          <AddressBlock />

          <AssetBlock />
        </div>
      </div>
    </S.XLResponsive>
  </S.Container>
);

ExpandLayout.defaultProps = {
  children: null,
  tabItems: [],
};

export default ExpandLayout;

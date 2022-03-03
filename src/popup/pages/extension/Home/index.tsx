import React from 'react';

import Header from 'popup/components/Header';
import shorter from 'popup/utils/shorter';
import CopyText from 'popup/components/CopyText';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import useActiveCurrency from 'popup/hooks/useActiveCurrency';
import useTotalBalance from 'popup/hooks/useTotalBalance';
import EditWalletName from 'popup/components/EditWalletName';

import useLoadHome from 'popup/hooks/useLoadHome';
import LoadingOne from 'popup/pages/LoadingOne';
import Links from './Links';
import DropDownList from './DropDownList';

import TabList from './TabList';
import * as S from './styles';

const Home = () => {
  const totalBalance = useTotalBalance();
  const activeCurrency = useActiveCurrency();
  const { assets, isConnected, publicKey } = useActiveAccount();

  const isLoading = useLoadHome();
  if (isLoading) {
    return <LoadingOne />;
  }
  return (
    <S.Container>
      <Header />
      <S.XlmBox>
        <S.Value>
          {totalBalance}
          {isConnected ? (
            <S.ModalActive onClick={() => {}} />
          ) : (
            <S.ModalInactive onClick={() => {}} />
          )}
        </S.Value>
        <S.Subject>Total ({activeCurrency.name})</S.Subject>
      </S.XlmBox>
      <S.InfoBox>
        <S.Label className="mb-[2px]">Name</S.Label>
        <S.Info className="mb-[6px]">
          <EditWalletName
            height={32}
            checkIconWidth={22}
            fontSize={16}
          />
        </S.Info>
        <S.DropDown>
          <DropDownList />
        </S.DropDown>
        <S.Label className="mb-[6px]">Address</S.Label>
        <S.Info>
          <CopyText text={publicKey} button={shorter(publicKey, 8)} />
        </S.Info>
      </S.InfoBox>
      <Links />

      <div style={{ marginTop: '12px' }}>
        <TabList balances={[]} editName />
      </div>
    </S.Container>
  );
};

export default Home;

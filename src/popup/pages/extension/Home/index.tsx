import React from 'react';
import { useLocation } from 'react-router-dom';

import shorter from 'popup/utils/shorter';
import LoadingOne from 'popup/pages/LoadingOne';
import CopyText from 'popup/components/CopyText';
import useLoadHome from 'popup/hooks/useLoadHome';
import Header from 'popup/components/common/Header';
import formatBalance from 'popup/utils/formatBalance';
import useTotalBalance from 'popup/hooks/useTotalBalance';
import ScrollBar from 'popup/components/common/ScrollBar';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import EditWalletName from 'popup/components/EditWalletName';
import useActiveCurrency from 'popup/hooks/useActiveCurrency';
import handleAssetSymbol from 'popup/utils/handleAssetSymbol';

import Links from './Links';
import * as S from './styles';
import TabList from './TabList';
import DropDownList from './DropDownList';

const Home = () => {
  const { state } = useLocation();
  const isLoading = useLoadHome();
  const totalBalance = useTotalBalance();
  const activeCurrency = useActiveCurrency();
  const { isConnected, publicKey } = useActiveAccount();
  const [currencies, options] = useTypedSelector((store) => [
    store.currencies,
    store.options,
  ]);

  if (isLoading && !state?.alreadyLoaded) {
    return <LoadingOne />;
  }

  return (
    <ScrollBar isHidden maxHeight={600}>
      <S.Container>
        <Header />

        <S.XlmBox>
          <S.Value>
            {handleAssetSymbol(currencies, options)}
            {formatBalance(totalBalance)}

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
            <CopyText
              text={publicKey}
              button={shorter(publicKey, 8)}
            />
          </S.Info>
        </S.InfoBox>

        <Links />

        <div className="mt-3">
          <TabList />
        </div>
      </S.Container>
    </ScrollBar>
  );
};

export default Home;

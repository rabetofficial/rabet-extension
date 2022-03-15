import React from 'react';
import { useLocation } from 'react-router-dom';

import shorter from 'popup/utils/shorter';
import LoadingOne from 'popup/pages/LoadingOne';
import CopyText from 'popup/components/common/CopyText';
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
// import isOtherConnected from 'popup/utils/isOtherConnected';
import openModalAction from 'popup/actions/modal/open';
import closeModalAction from 'popup/actions/modal/close';
// import ModalConnectStatus from 'popup/components/ModalConnectStatus';
import ExtTitle from 'popup/components/common/Title/Ext';

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
  // const [isOtherConnectedState, setIsOtherConnectedState] =
  //   useState(false);

  const [currencies, options] = useTypedSelector((store) => [
    store.currencies,
    store.options,
  ]);

  if (isLoading && !state?.alreadyLoaded) {
    return <LoadingOne />;
  }

  const toggleModal = () => {
    openModalAction({
      isStyled: false,
      title: '',
      size: 'medium',
      padding: 'medium',
      minHeight: 150,
      children: (
        <div className="content mt-4">
          <ExtTitle onClose={closeModalAction} />
          {/* <ModalConnectStatus
            host={host}
            forceUpdate={forceUpdate}
            toggleModal={toggleModal}
            result={isConnected}
            publicKey={activeAccount.publicKey}
            isOtherConnected={isOtherConnectedState}
          /> */}
        </div>
      ),
    });
  };

  return (
    <ScrollBar isHidden maxHeight={600}>
      <S.Container>
        <Header />

        <S.XlmBox>
          <S.Value>
            {handleAssetSymbol(currencies, options)}
            {formatBalance(totalBalance)}

            <span onClick={toggleModal} style={{ cursor: 'pointer' }}>
              {isConnected ? <S.ModalActive /> : <S.ModalInactive />}
            </span>
          </S.Value>
          <S.Subject>Total ({activeCurrency.name})</S.Subject>
        </S.XlmBox>

        <S.InfoBox>
          <S.Label className="mb-[2px]">Name</S.Label>
          <S.Info className="mb-[6px] w-[285px]">
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
              custom={<span>{shorter(publicKey, 8)}</span>}
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

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import shorter from 'popup/utils/shorter';
import FilledCopy from 'popup/svgs/FilledCopy';
import LoadingOne from 'popup/pages/LoadingOne';
import useLoadHome from 'popup/hooks/useLoadHome';
import Header from 'popup/components/common/Header';
import formatBalance from 'popup/utils/formatBalance';
import openModalAction from 'popup/actions/modal/open';
import CopyText from 'popup/components/common/CopyText';
import closeModalAction from 'popup/actions/modal/close';
import ExtTitle from 'popup/components/common/Title/Ext';
import useTotalBalance from 'popup/hooks/useTotalBalance';
import ScrollBar from 'popup/components/common/ScrollBar';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import EditWalletName from 'popup/components/EditWalletName';
import handleAssetSymbol from 'popup/utils/handleAssetSymbol';
import ModalConnectStatus from 'popup/components/ModalConnectStatus';

import Links from './Links';
import * as S from './styles';
import TabList from './TabList';
import DropDownList from './DropDownList';

const Home = () => {
  const { state } = useLocation();
  const isLoading = useLoadHome();
  const totalBalance = useTotalBalance();
  const [editableName, setEditableName] = useState(false);
  const { name, isConnected, publicKey } = useActiveAccount();

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
        <div className="content p-4">
          <ExtTitle onClose={closeModalAction} />
          <ModalConnectStatus />
        </div>
      ),
    });
  };
  return (
    <ScrollBar isHidden maxHeight={600}>
      <S.Container>
        <Header />
        <S.MainInfo>
          {editableName ? (
            <div className="mt-3 w-[196px]">
              <EditWalletName
                editable
                height={36}
                checkIconWidth={18}
                fontSize={16}
              />
            </div>
          ) : (
            <>
              <S.NameValue>{name}</S.NameValue>
              <CopyText
                text={publicKey}
                custom={
                  <span className="text-xs text-primary-dark inline-flex items-center gap-1">
                    {shorter(publicKey, 6)}
                    <FilledCopy />
                  </span>
                }
              />
            </>
          )}
          <span onClick={toggleModal} style={{ cursor: 'pointer' }}>
            {isConnected ? <S.ModalActive /> : <S.ModalInactive />}
          </span>
        </S.MainInfo>
        <S.DropDown>
          <DropDownList setEditableName={setEditableName} />
        </S.DropDown>
        <S.Value>
          {handleAssetSymbol(currencies, options)}
          {formatBalance(totalBalance)}
        </S.Value>

        <Links />

        <div className="mt-3">
          <TabList />
        </div>
      </S.Container>
    </ScrollBar>
  );
};

export default Home;

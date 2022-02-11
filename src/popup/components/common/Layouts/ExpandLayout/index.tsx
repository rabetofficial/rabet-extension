import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import FullRabetLogo from 'popup/svgs/FullRabetLogo';
import Network from 'popup/components/common/Header/Network';
import SearchAccounts from 'popup/components/common/Header/SearchAccounts';
import * as route from 'popup/staticRes/routes';
// import EditWalletName from 'popup/components/EditWalletName';
import CopyText from 'popup/components/common/CopyText';
import PlusBold from 'popup/svgs/PlusBold';

import * as S from './styles';
import AssetList from "./AssetList";

const sampleAddress =
  'GCTRXBGMSI64VVXX5O5EUFTGWOTICIHC7PUO24VMD4VOTVCSO6ODKAPQ';

type AppProps = {
  children: React.ReactNode;
};

const ExpandLayout = ({ children }: AppProps) => {
  const [overlay, toggleOverLay] = useState<boolean>(false);
  const [isEditable, setEditable] = useState(false);

  const toggleOverlay = (open: boolean) => {
    toggleOverLay(open);
  };
  return (
    <S.Container>
      <div
        className={classNames('overlay', overlay && 'show-overlay')}
        onClick={() => {
          toggleOverlay(false);
        }}
      />
      <div className="flex justify-between items-center">
        <Link to={route.homePage}>
          <FullRabetLogo />
        </Link>
        <div className="flex items-center space-x-[22px]">
          <Network theme="light" />
          <SearchAccounts
            toggleOverlay={toggleOverlay}
            isOpen={overlay}
          />
        </div>
      </div>
      <div className="flex flex-row space-x-[38px] mt-[23px]">
        <div className="grow">
          <S.Card>{children}</S.Card>
        </div>
        <div className="basis-[351px]">
          <S.Card className="pt-[22px] pb-[18px]">
            {/* <EditWalletName */}
            {/*  isEditable={isEditable} */}
            {/*  setEditable={setEditable} */}
            {/*  height={34} */}
            {/*  fontSize={14} */}
            {/* /> */}
            <div className="text-3xl font-medium mt-[15px]">
              $991.62
            </div>
            <div className="flex justify-between items-center mt-[18px]">
              <div className="text-base font-medium">
                Your Address
              </div>
              <S.QrTrigger>QR-code</S.QrTrigger>
            </div>
            <S.AddressBox>
              <CopyText
                text={sampleAddress}
                custom={<S.Address>{sampleAddress}</S.Address>}
              />
            </S.AddressBox>
          </S.Card>
          <S.Card className="mt-[38px] pt-[20px]">
            <div className="flex justify-between items-center">
              <div className="text-lg font-medium">Assets</div>
              <S.AssetTrigger>
                <PlusBold />
                <div className="ml-1">Add assets</div>
              </S.AssetTrigger>
            </div>
            <AssetList />
          </S.Card>
        </div>
      </div>
    </S.Container>
  );
};

export default ExpandLayout;

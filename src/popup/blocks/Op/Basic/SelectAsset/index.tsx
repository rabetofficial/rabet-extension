import { Horizon } from 'stellar-sdk';
import React, { useEffect, useState } from 'react';

import { Usage } from 'popup/models';
import AngleDownBold from 'popup/svgs/AngleDownBold';
import Modal from 'popup/components/common/ModalDialog';
import handleAssetAlt from 'popup/utils/handleAssetAlt';
import handleAssetImage from 'popup/utils/handleAssetImage';
import questionLogo from 'assets/images/question-circle.png';
import useTypedSelector from 'popup/hooks/useTypedSelector';

import * as S from './styles';
import SearchAsset from './Search';

type AppProps = {
  asset: Horizon.BalanceLine;
  assets: Horizon.BalanceLine[];
  onChange: (value: any) => void;
  usage: Usage;
  valueName?: string;
  defaultNull?: boolean;
  setValue?: null;
};

const SelectAssetModal = ({
  asset,
  onChange,
  assets,
  setValue,
  valueName,
  defaultNull,
  usage,
}: AppProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(
    defaultNull ? null : assets[0],
  );
  const assetImages = useTypedSelector((store) => store.assetImages);

  const onOpenModal = () => setIsModalOpen(true);
  const onCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (asset) {
      setCurrentAsset(asset);
    }
  }, [asset]);

  const handleAssetChange = (newAsset: Horizon.BalanceLine) => {
    setCurrentAsset(newAsset);

    onChange(newAsset);

    if (setValue) {
      setValue(valueName, newAsset);
    }
  };

  return (
    <S.InputContainer className="select-modal">
      <S.ModalTrigger onClick={onOpenModal}>
        <div className="flex items-center">
          {currentAsset ? (
            <>
              <S.Img
                fallBack={questionLogo}
                alt={handleAssetAlt(currentAsset)}
                src={handleAssetImage(currentAsset, assetImages)}
              />
              {currentAsset.asset_code || 'XLM'}
            </>
          ) : (
            <p>NONE</p>
          )}
        </div>
        <AngleDownBold />
      </S.ModalTrigger>

      <Modal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        isStyled={false}
        size={usage === 'extension' ? 'small' : 'medium'}
      >
        <SearchAsset
          assets={assets}
          valueName={valueName}
          closeModal={onCloseModal}
          onChange={handleAssetChange}
        />
      </Modal>
    </S.InputContainer>
  );
};

SelectAssetModal.defaultProps = {
  valueName: '',
  setValue: undefined,
  defaultNull: false,
};

export default SelectAssetModal;

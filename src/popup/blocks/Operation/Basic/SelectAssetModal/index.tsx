import React, { useState } from 'react';

import handleAssetImage from 'popup/utils/handleAssetImage';

import Modal from 'popup/components/common/ModalDialog';
import angleDownIcon from '../../../../../assets/images/angle-down.svg';
import questionLogo from '../../../../../assets/images/question-circle.png';
import SearchAsset from './SearchAsset';

import * as S from './styles';

type AppProps = {
  currencies: any[];
  onChange: (value: any) => void;
};

const SelectAssetModal = ({ currencies, onChange }: AppProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(currencies[0]);

  const onOpenModal = () => setIsModalOpen(true);
  const onCloseModal = () => setIsModalOpen(false);

  const handleAssetChange = (asset) => {
    setCurrentAsset(asset);
    onChange(asset);
  };

  return (
    <S.InputContainer className="select-modal">
      <S.ModalTrigger onClick={onOpenModal}>
        <div className="flex item-center">
          <S.Img
            fallBack={questionLogo}
            alt={currentAsset?.asset_code || 'ASSET'}
            src={handleAssetImage(currentAsset)}
          />
          {currentAsset?.asset_code.toUpperCase() || 'ASSET'}
        </div>
        <img src={angleDownIcon} alt="icon" />
      </S.ModalTrigger>

      <Modal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        isStyled={false}
      >
        <SearchAsset
          currencies={currencies}
          closeModal={onCloseModal}
          onChange={handleAssetChange}
        />
      </Modal>
    </S.InputContainer>
  );
};

export default SelectAssetModal;

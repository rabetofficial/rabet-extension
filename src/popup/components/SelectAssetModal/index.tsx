import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState } from 'react';

import angleDownIcon from 'assets/images/angle-down.svg';
import handleAssetImage from 'popup/utils/handleAssetImage';
import questionLogo from 'assets/images/question-circle.png';

import Modal from '../Modal';
import Image from '../Image';
import SearchAsset from './SearchAsset';

import styles from './styles.less';

const SelectAssetModal = ({ currencies, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(currencies[0]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAssetChange = (asset) => {
    setCurrentAsset(asset);
    onChange(asset);
  };

  return (
    <div className={classNames(styles.input, 'select-modal')}>
      <div className={styles.modal} onClick={toggleModal}>
        <div className={styles.modalValue}>
          <Image
            fallBack={questionLogo}
            className={styles.currencyImg}
            alt={currentAsset?.asset_code || 'ASSET'}
            src={handleAssetImage(currentAsset)}
          />
          {currentAsset?.asset_code.toUpperCase() || 'ASSET'}
        </div>
        <img src={angleDownIcon} alt="icon" />
      </div>

      {isModalOpen && (
        <Modal
          id="modal"
          isOpen={isModalOpen}
          onClose={toggleModal}
          styled={false}
        >
          <SearchAsset
            currencies={currencies}
            closeModal={toggleModal}
            onChange={handleAssetChange}
          />
        </Modal>
      )}
    </div>
  );
};

SelectAssetModal.propTypes = {
  currencies: PropTypes.array.isRequired,
};

export default SelectAssetModal;

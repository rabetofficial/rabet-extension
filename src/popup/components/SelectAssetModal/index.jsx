import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Modal from '../Modal';
import SearchAsset from './SearchAsset';
import handleAssetImage from '../../utils/handleAssetImage';
import angleDownIcon from '../../../assets/images/angle-down.svg';

import styles from './styles.less';

const SelectAssetModal = ({
  currencies,
  onChange,
}) => {
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
    <div className={styles.input}>
      <div className={styles.modal} onClick={toggleModal}>
        <div className={styles.modalValue}>
          <img
            src={handleAssetImage(currentAsset)}
            alt={currentAsset.asset_code}
            className={styles.currencyImg}
          />
          {currentAsset.asset_code.toUpperCase()}
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

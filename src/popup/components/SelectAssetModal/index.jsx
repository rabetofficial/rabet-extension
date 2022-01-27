import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import Modal from '../Modal';
import Image from '../Image';
import SearchAsset from './SearchAsset';
import handleAssetImage from '../../utils/handleAssetImage';
import angleDownIcon from '../../../assets/images/angle-down.svg';
import questionLogo from '../../../assets/images/question-circle.png';

import styles from './styles.less';

const SelectAssetModal = ({
  asset,
  onChange,
  currencies,
  setValue,
  valueName,
  defaultNull,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(defaultNull ? null : currencies[0]);

  useEffect(() => {
    if (asset) {
      setCurrentAsset(asset);
    }
  }, [asset]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAssetChange = (newAsset) => {
    setCurrentAsset(newAsset);
    onChange(newAsset);

    if (setValue) {
      setValue(valueName, newAsset);
    }
  };

  return (
    <div className={classNames(styles.input, 'select-modal')}>
      <div className={styles.modal} onClick={toggleModal}>
        <div className={styles.modalValue}>
          {currentAsset ? (
            <>
              <Image
                fallBack={questionLogo}
                className={styles.currencyImg}
                alt={currentAsset.asset_code}
                src={handleAssetImage(currentAsset)}
              />

              {currentAsset.asset_code.toUpperCase()}
            </>
          ) : (
            <p>NONE</p>
          )}
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

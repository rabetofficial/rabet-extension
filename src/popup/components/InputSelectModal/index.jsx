import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Modal from '../Modal';
import angleDownIcon from '../../../assets/images/angle-down.svg';

import styles from './styles.less';

const InputSelectModal = ({
  input, meta, form, max, currencies,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.input}>
      <Input
        type="number"
        placeholder="1"
        size="input-medium"
        input={input}
        meta={meta}
        variant={max ? 'max' : ''}
        setMax={max ? form.mutators.setMax : () => {}}
      />

      <div className={styles.modal} onClick={toggleModal}>
        <div className={styles.modalValue}>
          <img
            src={currencies[0].img}
            alt={currencies[0].value}
            className={styles.currencyImg}
          />
          {currencies[0].value.toUpperCase()}
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
          test
        </Modal>
      )}
    </div>
  );
};

InputSelectModal.defaultProps = {
  max: false,
};

InputSelectModal.propTypes = {
  max: PropTypes.bool,
  currencies: PropTypes.array.isRequired,
};

export default InputSelectModal;

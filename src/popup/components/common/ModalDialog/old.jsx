import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDom from 'react-dom';

import styles from './styles.less';

const modalRoot = document.getElementById('root');

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const Modal = ({
  isOpen, onClose, modalSize, modalClass, id, title, children, styled,
}) => {
  const background = useRef(null);
  const [fadeType, setFadeUp] = useState(null);
  const prevIsOpen = usePrevious(isOpen);

  const handleClick = (e) => {
    e.preventDefault();
    setFadeUp('out');
    onClose();
  };

  const handleModalSize = (size) => {
    switch (size) {
      case 'lg':
        return '800';
      default:
        return '328';
    }
  };

  const onEscKeyDown = (e) => {
    if (e.key !== 'Escape') return;
    setFadeUp('out');
  };

  const transitionEnd = (e) => {
    if (e.propertyName !== 'opacity' || fadeType === 'in') return;

    if (fadeType === 'out') {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen && prevIsOpen) {
      setFadeUp('out');
    }
  });

  useEffect(() => {
    window.addEventListener('keydown', onEscKeyDown, false);
    setTimeout(() => setFadeUp('in'), 0);

    return () => {
      window.removeEventListener('keydown', onEscKeyDown, false);
    };
  });

  return ReactDom.createPortal(
    <div
      id={id}
      className={classNames(`wrapper ${`size-${modalSize}`} fade-${fadeType} ${modalClass}`, styles.modal)}
      style={{ width: `${handleModalSize(modalSize)}px` }}
      role="dialog"
      onTransitionEnd={transitionEnd}
    >
      <div
        className="modal-dialog"
        style={{ padding: styled ? '11px 16px 24px 16px' : '0' }}
      >
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
          {styled ? (
            <button type="button" onClick={handleClick} className="close">
              <span className="icon-multiply" />
            </button>
          ) : null}
        </div>
        <div className="modal-content" style={{ marginTop: styled ? '21px' : '0' }}>
          {children}
        </div>
      </div>
      <div className="modal-background" onMouseDown={handleClick} ref={background} />
    </div>,
    modalRoot,
  );
};

Modal.defaultProps = {
  modalClass: '',
  modalSize: 'md',
  title: '',
  styled: true,
};

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  modalClass: PropTypes.string,
  modalSize: PropTypes.string,
  title: PropTypes.string,
  styled: PropTypes.bool,
};

export default Modal;

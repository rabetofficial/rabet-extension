import React, { useState, useRef, useEffect } from 'react';
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

type AppProps = {
  id: string
  title?: string
  isOpen: boolean
  onClose: () => void
  size?: 'lg' | 'md'
  styled?: boolean
  className?: string
  children: React.ReactNode
}

const defaultProps = {
  title: '',
  size: 'md',
  className: '',
  styled: true,
};

const Modal = ({
  isOpen, onClose, size, className, id, title, children, styled,
}: AppProps) => {
  const background = useRef(null);
  const [fadeType, setFadeUp] = useState<string | null>(null);
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
      className={classNames(`wrapper ${`size-${size}`} fade-${fadeType} ${className}`, styles.modal)}
      style={{ width: `${handleModalSize(size)}px` }}
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

Modal.defaultProps = defaultProps;

export default Modal;

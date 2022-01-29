import React, {
  useState, useRef, useEffect, TransitionEvent, KeyboardEvent, MouseEvent,
} from 'react';
import classNames from 'classnames';
import ReactDom from 'react-dom';

import styles from './styles.less';

const modalRoot = document.getElementById('root') as HTMLElement;

function usePrevious(value: any) {
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

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setFadeUp('out');
    onClose();
  };

  const handleModalSize = (modalSize: string | undefined) => {
    switch (modalSize) {
      case 'lg':
        return '428';
      default:
        return '306';
    }
  };

  const onEscKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    setFadeUp('out');
  };

  const transitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
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
    window.addEventListener('keydown', (event: any) => {
      onEscKeyDown(event);
    }, false);
    setTimeout(() => setFadeUp('in'), 0);

    return () => {
      window.removeEventListener('keydown', (event: any) => {
        onEscKeyDown(event);
      }, false);
    };
  });

  if (!isOpen) {
    return null;
  }

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

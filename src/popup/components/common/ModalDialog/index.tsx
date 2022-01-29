import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Modal from 'react-modal';

import Multiply from '../../../svgs/Multiply';
import { ModalSize } from '../../../models';

import * as S from './styles';

type AppProps = {
  title?: string
  isOpen: boolean
  onClose: () => void
  size?: ModalSize
  isStyled?: boolean
  className?: string
  children: React.ReactNode
}

const ModalDialog = ({
  title, isOpen, onClose, size, isStyled, className, children,
}: AppProps) => {
  const renderModalSize = () => {
    if (size === 'small') {
      return 306;
    }
    if (size === 'medium') {
      return 428;
    }

    return 800;
  };

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.32)',
      display: 'grid',
    },
    content: {
      borderRadius: '2px',
      padding: '0',
      width: `${renderModalSize()}px`,
      height: 'fit-content',
      border: '1px solid rgba(33 35 38, 0.05)',
      margin: 'auto',
    },
  };

  return (
    <div className={className}>
      <CSSTransition
        in={isOpen}
        timeout={400}
        classNames="dialog"
      >
        <Modal
          appElement={document.getElementById('root') as HTMLElement}
          closeTimeoutMS={300}
          isOpen={isOpen}
          style={modalStyles}
          shouldCloseOnOverlayClick
          onRequestClose={onClose}
        >
          {isStyled ? (
            <S.Container>
              <div className="flex justify-between items-center">
                <S.Title className="text-lg font-bold">{title}</S.Title>
                <button type="button" onClick={onClose}>
                  <Multiply />
                </button>
              </div>
              <S.Content>
                {children}
              </S.Content>
            </S.Container>
          ) : children}
        </Modal>
      </CSSTransition>
    </div>
  );
};

ModalDialog.defaultProps = {
  title: '',
  size: 'sm',
  className: '',
  isStyled: true,
};

export default ModalDialog;

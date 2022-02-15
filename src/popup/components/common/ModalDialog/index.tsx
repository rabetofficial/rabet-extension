import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Modal from 'react-modal';

import Multiply from 'popup/svgs/Multiply';
import { ModalSize } from 'popup/models';
import useWindowDimensions from 'popup/hooks/useWindowDimensions';

import * as S from './styles';

type AppProps = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  isStyled?: boolean;
  padding?: 'medium' | 'large';
  minHeight?: number;
  children: React.ReactNode;
};

const ModalDialog = ({
  title,
  isOpen,
  onClose,
  size,
  isStyled,
  padding,
  minHeight,
  children,
}: AppProps) => {
  const { windowWidth } = useWindowDimensions();
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
      width:
        windowWidth - 80 <= renderModalSize()
          ? 'auto'
          : `${renderModalSize()}px`,
      height: 'fit-content',
      border: '1px solid rgba(33 35 38, 0.05)',
      margin: 'auto',
      inset: windowWidth < 768 ? '20px' : '40px',
      minHeight: `${minHeight}px`,
    },
  };

  Modal.setAppElement('#root');

  return (
    <>
      {isOpen && (
        <Modal
          closeTimeoutMS={300}
          isOpen={isOpen}
          style={modalStyles}
          shouldCloseOnOverlayClick
          onRequestClose={onClose}
        >
          {isStyled ? (
            <S.Container className={padding}>
              <div className="flex justify-between items-center">
                <S.Title className="text-lg font-bold">
                  {title}
                </S.Title>
                <button type="button" onClick={onClose}>
                  <Multiply />
                </button>
              </div>
              <S.Content>{children}</S.Content>
            </S.Container>
          ) : (
            children
          )}
        </Modal>
      )}
    </>
  );
};

ModalDialog.defaultProps = {
  title: '',
  size: 'sm',
  isStyled: true,
  padding: '',
  minHeight: 100,
};

export default ModalDialog;

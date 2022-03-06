import React from 'react';
import Modal from 'react-modal';

import Multiply from 'popup/svgs/Multiply';
import { IModal } from 'popup/reducers/modal';
import useWindowDimensions from 'popup/hooks/useWindowDimensions';

import * as S from './styles';

interface ModalDialogType extends IModal {
  onClose: () => void;
}

const ModalDialog = ({
  size,
  title,
  isOpen,
  onClose,
  padding,
  isStyled,
  children,
  minHeight,
}: ModalDialogType) => {
  const { windowWidth } = useWindowDimensions();

  const getModalSize = () => {
    if (size === 'small') {
      return 306;
    }
    if (size === 'medium') {
      return 428;
    }
    return 800;
  };

  const renderModalWidth = () => {
    const modalSize = getModalSize();
    if (windowWidth - 80 <= modalSize) {
      if (modalSize <= 360) {
        return '306px';
      }
      return 'auto';
    }
    return `${modalSize}px`;
  };

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.32)',
      display: 'grid',
    },
    content: {
      borderRadius: '2px',
      padding: '0',
      width: renderModalWidth(),
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

export default ModalDialog;

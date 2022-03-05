import styled from 'styled-components';
import Image from 'popup/components/common/Image';

const width = 107;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;

  .input-medium {
    box-sizing: border-box;
    width: calc(100% - ${width}px);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    margin: 0;
  }
`;

export const ModalTrigger = styled.div`
  box-sizing: border-box;
  width: ${width}px;
  height: 48px;
  background: transparent;
  border-radius: 0 2px 2px 0;
  border: 1px solid ${({ theme }) => theme.colors.primary.lighter};
  border-left: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  padding: 0 10px 0 7px;
`;

export const Img = styled(Image)`
  width: 24px;
  height: auto;
  margin-right: 4px;
`;

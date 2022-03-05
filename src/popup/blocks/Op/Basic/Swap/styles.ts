import styled from 'styled-components';

export const ModalInput = styled.div`
  display: flex;
  align-items: flex-start;

  .input-medium {
    margin: 0;
    box-sizing: border-box;
    width: 100%;
  }

  .input-medium,
  .select-modal {
    margin: 8px 0;
  }
`;

export const Hr = styled.hr`
  margin: 14px 0;
  border: none;
  height: 1px;
  background: ${({ theme }) => theme.colors.primary.lighter};
`;

export const Equivalent = styled.div`
  color: ${({ theme }) => theme.colors.primary.dark};
  font-size: 14px;
  display: flex;
  justify-content: right;
  align-items: center;

  img {
    margin-left: 4px;
  }
`;

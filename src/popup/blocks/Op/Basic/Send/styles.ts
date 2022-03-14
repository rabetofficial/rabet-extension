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

export const PopoverContainer = styled.div`
  [data-tippy-root] {
    width: 100%;
    margin-top: -10px !important;
  }
`;

import styled from 'styled-components';

export const ErrorMsg = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.error.main};
  margin: 0;
`;

export const Group = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.primary.light};
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;
  margin-bottom: 8px;
  
  &:focus, &:focus-within {
    border: 1px solid black;
  }
`;

export const Icon = styled.button`
  padding-right: 16px;
  background: transparent;
  border: 1px solid transparent;
  
  svg {
    margin-right: 0;
  }
`;

export const Max = styled.button`
  padding-right: 16px;
  background: transparent;
  border: 1px solid transparent;
  cursor: default;
`;

export const MaxIcon = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-right: 0 !important;
  font-size: 15px;
  
  &:hover {
    transition: 0.3s ease-in;
    color: ${({ theme }) => theme.colors.primary.darkest};
  }
`;

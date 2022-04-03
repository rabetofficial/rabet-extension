import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  max-height: 600px;
`;

export const MainInfo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const NameValue = styled.div`
  margin-top: 12px;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
`;

export const ModalInactive = styled.span`
  position: absolute;
  top: 23px;
  left: 16px;
  border: 2px solid #f48b00;
  width: 12px;
  height: 12px;
  border-radius: 50%;
`;

export const ModalActive = styled.span`
  position: absolute;
  top: 23px;
  left: 16px;
  border: 2px solid #26c362;
  width: 12px;
  height: 12px;
  border-radius: 50%;
`;

export const DropDown = styled.span`
  position: absolute;
  top: 40px;
  right: 16px;
`;

export const Value = styled.div`
  margin: 18px 0 3px;
  font-size: 32px;
  color: black;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.31;
  letter-spacing: normal;
  text-align: center;
`;
export const Subject = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary.dark};
  text-align: center;
  margin: 0 auto;
`;

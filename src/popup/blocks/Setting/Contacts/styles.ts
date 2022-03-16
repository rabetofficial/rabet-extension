import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 40px;
`;

export const IconContainer = styled.div`
  margin-right: 13px;
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const IconExample = styled.div`
  width: 48px;
  height: 48px;
  background-color: #def0ff;
  border: 1px solid #def0ff;
  color: #415cbe;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

export const Hr = styled.hr`
  margin: 16px 0;
  background-color: ${({ theme }) => theme.colors.primary.lighter};
`;

export const Name = styled.p`
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: ${({ theme }) => theme.colors.primary.darkest};
`;

export const Address = styled.p`
  margin-top: 2px;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #000;
`;

export const Title = styled.p`
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: ${({ theme }) => theme.colors.primary.darkest};
`;

export const Code = styled(Address)`
  color: ${({ theme }) => theme.colors.primary.darkest};
  margin-top: 6px;
`;

export const ActionIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChildContainer = styled.div`
  padding: 18px 32px 24px;
  @media (max-width: 360px) {
    padding: 16px;
  }
`;

export const ChildLabel = styled.div`
  font-size: 16px;
  margin-bottom: -2px;
  font-weight: 500;
  @media (max-width: 360px) {
    margin-top: 0px;
  }
`;

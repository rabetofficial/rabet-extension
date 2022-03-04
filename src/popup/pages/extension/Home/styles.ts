// @import '../../../styles/theme.less';
import styled from 'styled-components';

export const Container = styled.div`
  overflow: hidden;
`;

export const Xlm = styled.div`
  width: 14px;
  height: 12px;
  margin-right: 6px;
`;

export const Subject = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary.dark};
  text-align: center;
  margin: 6px auto 0 auto;
`;

export const Label = styled.p`
  color: ${({ theme }) => theme.colors.primary.dark};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;

export const Value = styled.div`
  font-size: 20px;
  color: @shark;
  font-weight: 500;
  text-align: center;
  margin: 0 auto;

  span {
    font-weight: 100;
    font-size: 17px;
  }
`;

export const XlmBox = styled.div`
  padding: 12px 0 12px 0;
`;

export const ModalInactive = styled.span`
  border: 1px solid #f48b00;
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

export const ModalActive = styled(ModalInactive)`
  border: 1px solid ${({ theme }) => theme.colors.success};
`;

export const DropDown = styled.span`
  position: absolute;
  top: 170px;
  right: 8px;
`;

export const ModalBtn = styled.div`
  position: absolute;
  top: 8px;
  right: 16px;
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  cursor: pointer;
`;

export const ModalButton = styled.div`
  display: flex;
  margin-top: 45px;

  button {
    font-size: 18px;
    width: 100%;
    border-radius: 4px;
  }
`;

export const Info = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;

export const InfoBox = styled.p`
  //background-color: @Alabaster;
  border-top: 1px solid #ececec;
  padding: 16px;
`;

export const Edit = styled.div`
  cursor: pointer;
  margin-left: 6px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;

  button {
    padding-right: 8px;
    background: white;

    span {
      margin-right: 0;
    }
  }
`;

export const Form = styled.div`
  margin-top: 3px;
`;

export const Btn = styled.div`
  height: 36px;
  width: 36px;
  margin-left: 14px;
  border-radius: 2px;

  .icon-checkmark {
    font-size: 15px;
    margin-right: 0;
  }
`;
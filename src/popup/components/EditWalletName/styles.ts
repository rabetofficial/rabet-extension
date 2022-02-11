import styled from 'styled-components';
import Button from 'popup/components/common/Button';

export const Form = styled.form.attrs(
  (props: { fontSize: number }) => props,
)`
  display: flex;
  .input {
    font-size: ${(props) => props.fontSize}px!important;
  }
`;

export const SubmitButton = styled(Button).attrs(
  (props: any) => props,
)`
  margin-left: 14px;
  border-radius: 2px;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;

  svg {
    width: 18px;
  }
`;

export const Info = styled.p.attrs((props: any) => props)`
  display: flex;
  align-items: center;
  color: black;
  font-size: ${(props) => props.fontSize}px;
`;

export const EditIcon = styled.div`
  cursor: pointer;
  margin-left: 6px;
`;

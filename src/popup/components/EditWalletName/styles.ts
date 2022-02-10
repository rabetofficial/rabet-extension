import styled from 'styled-components';
import Button from 'popup/components/common/Button';
import { Field } from 'react-final-form';

export const InputField = styled(Field)`
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

export const SubmitButton = styled(Button)`
  width: 40px;
  height: 40px;
  margin-left: 14px;
  border-radius: 2px;

  svg {
    width: 18px;
  }
`;

export const Info = styled.p`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: black;
`;

export const EditIcon = styled.div`
  cursor: pointer;
  margin-left: 6px;
`;

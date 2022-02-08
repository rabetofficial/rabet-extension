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
  height: 36px;
  width: 36px;
  margin-left: 14px;
  border-radius: 2px;

  .icon-checkmark {
    font-size: 15px;
    margin-right: 0;
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

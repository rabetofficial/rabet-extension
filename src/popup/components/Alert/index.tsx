import ExclamationCircle from 'popup/svgs/ExclamationCircle';
import React from 'react';

import * as S from './styles';

interface AlertProps {
  type: string;
  text: string;
}

const Alert = ({ type, text }: AlertProps) => (
  <S.Alert className={type}>
    <S.Box>
      <span className="mt-1">
        {type === 'alert-warning' ? (
          <ExclamationCircle fill="#E19411" />
        ) : (
          ''
        )}
      </span>

      <p>{text}</p>
    </S.Box>
  </S.Alert>
);

export default Alert;

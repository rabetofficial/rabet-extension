import React from 'react';

import ExclamationCircle from 'popup/svgs/ExclamationCircle';

import * as S from './styles';

type NoteProps = {
  children?: JSX.Element;
  variant?: 'warn';
  text?: string;
};

const Note = ({ children, variant, text }: NoteProps) => {
  if (!text) {
    return <S.Note>{children}</S.Note>;
  }

  return (
    <S.Box className={`${variant}`}>
      {variant === 'warn' ? (
        <S.Icon>
          <ExclamationCircle />
        </S.Icon>
      ) : null}
      <span>{text}</span>
    </S.Box>
  );
};
Note.defaultProps = {
  children: '',
  variant: '',
  text: '',
};
export default Note;

import React from 'react';

import Note from 'popup/components/Note';
import Button from 'popup/components/common/Button';
import CopyText from 'popup/components/common/CopyText';

import * as S from './styles';

type NoteCardType = {
  title: string;
  message: string;
  onClick: () => void;
  copy?: boolean;
  icon: React.ReactNode;
  btnText?: boolean | string;
};
const NoteCard = ({
  title,
  message,
  icon,
  onClick,
  copy,
  btnText,
}: NoteCardType) => (
  <S.container>
    <Note>
      <div>
        <S.Title>
          <S.IconContainer>{icon}</S.IconContainer>
          {title}
        </S.Title>
        <S.Msg>
          {message} {copy && <CopyText text={message} />}
        </S.Msg>

        {btnText ? (
          <S.Btn>
            <Button
              variant="outlined"
              content={btnText}
              size="small"
              onClick={onClick}
            />
          </S.Btn>
        ) : (
          ''
        )}
      </div>
    </Note>
  </S.container>
);

NoteCard.defaultProps = {
  copy: false,
  btnText: false,
};

export default NoteCard;

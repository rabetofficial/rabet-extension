import React from 'react';

import Note from 'popup/components/Note';
import Button from 'popup/components/common/Button';
import CopyText from 'popup/components/CopyText';

import * as S from './styles';

type NoteCardType = {
  title: string;
  icon: string;
  iconClass: string;
  message: string;
  onClick: () => void;
  copy?: boolean;
  btnText?: boolean | string;
};
const NoteCard = ({
  title,
  icon,
  iconClass,
  message,
  onClick,
  copy,
  btnText,
}: NoteCardType) => (
  <div className="flex-parent content" style={{ marginTop: '87px' }}>
    <Note>
      <div>
        <S.Title>
          <S.IconContainer className={iconClass}>
            <span className={icon} />
          </S.IconContainer>

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
  </div>
);

NoteCard.defaultProps = {
  copy: false,
  btnText: false,
};

export default NoteCard;

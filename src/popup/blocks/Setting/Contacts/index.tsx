import React from 'react';
import Button from 'popup/components/common/Button';
import PageTitle from 'popup/components/PageTitle';
import Plus from 'popup/svgs/Plus';
import EditPen from 'popup/svgs/EditPen';
import Multiply from 'popup/svgs/Multiply';
import openModalAction from 'popup/actions/modal/open';
import closeModalAction from 'popup/actions/modal/close';

import * as S from './styles';
import CreateContact from './CreateContact';
import EditContact from './EditContact';

type ContactType = {
  handleDelete: () => void;
};
const Contact = ({ handleDelete }: ContactType) => {
  const handleOpenModal = () => {
    openModalAction({
      isStyled: false,
      title: 'Create contact',
      size: 'medium',
      padding: 'large',
      minHeight: 470,
      children: (
        <CreateContact
          onSubmit={() => console.log('hello')}
          onClick={closeModalAction}
          onClose={closeModalAction}
        />
      ),
    });
  };
  const handleEdit = () => {
    openModalAction({
      isStyled: false,
      title: 'Edit contact',
      size: 'medium',
      padding: 'large',
      minHeight: 470,
      children: (
        <EditContact
          onSubmit={() => console.log('hello')}
          onClick={closeModalAction}
          onClose={closeModalAction}
        />
      ),
    });
  };
  return (
    <div style={{ width: '80%' }}>
      <PageTitle isSetting title="Contacts" padding="0" />
      <Button
        type="file"
        variant="outlined"
        size="medium"
        content="Add Contacts"
        startIcon={<Plus />}
        onClick={handleOpenModal}
        style={{
          borderRadius: '4px',
          marginTop: '13px',
        }}
      />
      <S.Container>
        <S.ContentContainer>
          <div style={{ display: 'flex' }}>
            <div>
              <S.IconContainer>
                <S.IconExample>J</S.IconExample>
              </S.IconContainer>
            </div>
            <div>
              <S.Name>John</S.Name>
              <S.Address>GDTYMQR4…NIPZ4T7B</S.Address>
            </div>
          </div>
          <div>
            <S.Title>Title</S.Title>
            <S.Code>182847493</S.Code>
          </div>
          <S.ActionIcons>
            <span
              style={{ marginRight: '15px', cursor: 'pointer' }}
              onClick={handleEdit}
            >
              <EditPen />
            </span>
            <span
              onClick={handleDelete}
              style={{ cursor: 'pointer' }}
            >
              <Multiply />
            </span>
          </S.ActionIcons>
        </S.ContentContainer>
      </S.Container>
      <S.Hr />
    </div>
  );
};

export default Contact;

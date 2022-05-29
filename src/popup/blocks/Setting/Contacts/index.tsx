import React from 'react';
import { useNavigate } from 'react-router-dom';

import Plus from 'popup/svgs/Plus';
import { Usage } from 'popup/models';
import showName from 'helpers/showName';
import EditPen from 'popup/svgs/EditPen';
import maxText from 'popup/utils/maxText';
import shorter from 'popup/utils/shorter';
import Multiply from 'popup/svgs/Multiply';
import RouteName from 'popup/staticRes/routes';
import PageTitle from 'popup/components/PageTitle';
import Button from 'popup/components/common/Button';
import openModalAction from 'popup/actions/modal/open';
import CopyText from 'popup/components/common/CopyText';
import closeModalAction from 'popup/actions/modal/close';
import ScrollBar from 'popup/components/common/ScrollBar';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import deleteContactAction from 'popup/actions/contacts/delete';
import { Contact as ContactType } from 'popup/reducers/contacts';

import * as S from './styles';
import EditContact from './EditContact';
import CreateContact from './CreateContact';

type ContactProps = {
  onClose: () => void;
  needTitle?: boolean;
  usage: Usage;
};

const Contact = ({ onClose, needTitle, usage }: ContactProps) => {
  const navigate = useNavigate();
  const contacts = useTypedSelector((store) => store.contacts);

  const openAddContactModal = () => {
    openModalAction({
      isStyled: false,
      title: 'Create contact',
      size: 'medium',
      padding: 'large',
      minHeight: 470,
      children: (
        <CreateContact onClose={closeModalAction} titlePage="" />
      ),
    });
  };

  const openEditContactModal = (contact: ContactType) => {
    openModalAction({
      isStyled: false,
      title: 'Edit contact',
      size: 'medium',
      padding: 'large',
      minHeight: 470,
      children: (
        <EditContact contact={contact} onClose={closeModalAction} />
      ),
    });
  };

  const handleOpenAddContact = () => {
    if (usage === 'extension') {
      navigate(RouteName.AddContact);
    } else {
      openAddContactModal();
    }
  };

  const handleOpenEditContact = (contact: ContactType) => {
    if (usage === 'extension') {
      navigate(RouteName.EditContact, {
        state: {
          contact,
        },
      });
    } else {
      openEditContactModal(contact);
    }
  };

  return (
    <div style={{ maxWidth: '460px' }}>
      {needTitle && (
        <PageTitle
          isSetting
          padding="0"
          title="Contacts"
          onClose={onClose}
        />
      )}

      <Button
        type="file"
        variant="outlined"
        size="medium"
        content="Add Contact"
        startIcon={<Plus />}
        onClick={handleOpenAddContact}
        style={{
          borderRadius: '4px',
          marginTop: '13px',
        }}
      />

      <ScrollBar isHidden>
        <S.Container>
          {contacts.map((contact, index) => (
            <div key={`contact${contact.publicKey}`}>
              <S.ContentContainer>
                <div style={{ display: 'flex' }}>
                  <div>
                    <S.IconContainer>
                      <S.IconExample>
                        {contact.name[0].toUpperCase()}
                      </S.IconExample>
                    </S.IconContainer>
                  </div>

                  <div>
                    <S.Name>
                      <span>{showName(contact.name)}</span>
                    </S.Name>

                    <CopyText
                      text={contact.publicKey}
                      custom={
                        <S.Address>
                          {shorter(contact.publicKey, 8)}
                        </S.Address>
                      }
                    />
                  </div>
                </div>

                {contact.memo && (
                  <div>
                    <S.Title>Memo</S.Title>
                    <S.Code>{maxText(contact.memo, 8) || '-'}</S.Code>
                  </div>
                )}

                <S.ActionIcons>
                  <span
                    style={{ marginRight: '15px', cursor: 'pointer' }}
                    onClick={() => {
                      handleOpenEditContact(contact);
                    }}
                  >
                    <EditPen />
                  </span>
                  <span
                    onClick={() => {
                      deleteContactAction(contact);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <Multiply />
                  </span>
                </S.ActionIcons>
              </S.ContentContainer>
              {contacts.length !== index + 1 && <S.Hr />}
            </div>
          ))}
        </S.Container>
      </ScrollBar>
    </div>
  );
};

Contact.defaultProps = {
  needTitle: true,
};

export default Contact;

import React from 'react';

import Plus from 'popup/svgs/Plus';
import EditPen from 'popup/svgs/EditPen';
import shorter from 'popup/utils/shorter';
import Multiply from 'popup/svgs/Multiply';
import PageTitle from 'popup/components/PageTitle';
import Button from 'popup/components/common/Button';
import openModalAction from 'popup/actions/modal/open';
import closeModalAction from 'popup/actions/modal/close';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import deleteContactAction from 'popup/actions/contacts/delete';
import { Contact as ContactType } from 'popup/reducers/contacts';

import * as S from './styles';
import EditContact from './EditContact';
import CreateContact from './CreateContact';
import CopyText from 'popup/components/common/CopyText';
import ScrollBar from 'popup/components/common/ScrollBar';

type ContactProps = {
  onClose: () => void;
  needTitle?: boolean;
};

const Contact = ({ onClose, needTitle }: ContactProps) => {
  const contacts = useTypedSelector((store) => store.contacts);

  const openAddContactModal = () => {
    openModalAction({
      isStyled: false,
      title: 'Create contact',
      size: 'medium',
      padding: 'large',
      minHeight: 470,
      children: <CreateContact onClose={closeModalAction} />,
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
        onClick={openAddContactModal}
        style={{
          borderRadius: '4px',
          marginTop: '13px',
        }}
      />
      <ScrollBar isHidden>
        <S.Container>
          {contacts.map((contact) => (
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
                      {contact.name.length > 20 ? (
                        <span>{`${contact.name.slice(
                          0,
                          10,
                        )}...`}</span>
                      ) : (
                        <span>{contact.name}</span>
                      )}
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
                    <S.Code>{contact.memo || '-'}</S.Code>
                  </div>
                )}

                <S.ActionIcons>
                  <span
                    style={{ marginRight: '15px', cursor: 'pointer' }}
                    onClick={() => {
                      openEditContactModal(contact);
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

              <S.Hr />
            </div>
          ))}
        </S.Container>
      </ScrollBar>
    </div>
  );
};

Contact.defaultProps = { needTitle: true };

export default Contact;

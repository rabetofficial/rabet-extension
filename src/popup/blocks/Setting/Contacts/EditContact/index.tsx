import React from 'react';
import { StrKey } from '@stellar/stellar-sdk';
import { Form, Field } from 'react-final-form';

import { Usage } from 'popup/models';
import Input from 'popup/components/common/Input';
import { Contact } from 'popup/reducers/contacts';
import PageTitle from 'popup/components/PageTitle';
import Button from 'popup/components/common/Button';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import editContactAction from 'popup/actions/contacts/edit';
import ButtonContainer from 'popup/components/common/ButtonContainer';
import Error from 'popup/components/common/Error';

import { ChildContainer, ChildLabel } from '../styles';

type EditContactType = {
  contact: Contact;
  titlePage?: boolean;
  onClose: () => void;
  children?: JSX.Element;
  usage: Usage;
};

const EditContact = ({
  usage,
  contact,
  onClose,
  children,
  titlePage,
}: EditContactType) => {
  const [accounts, contacts] = useTypedSelector((store) => [
    store.accounts,
    store.contacts,
  ]);

  const validateForm = (values: Contact) => {
    const errors: Partial<Contact> = {};

    if (!values.name) {
      errors.name = '';
    }

    if (!values.publicKey) {
      errors.publicKey = '';
    } else {
      if (!StrKey.isValidEd25519PublicKey(values.publicKey)) {
        errors.publicKey = 'Address is invalid.';
      } else {
        const foundAccount = accounts.find(
          (account) => account.publicKey === values.publicKey,
        );

        if (foundAccount) {
          errors.publicKey =
            'You cannot add your own account as a contact.';
        } else {
          const otherContacts = contacts.filter(
            (aContact) => aContact.publicKey !== contact.publicKey,
          );

          const foundContact = otherContacts.find(
            (aContact) => aContact.publicKey === values.publicKey,
          );

          if (foundContact) {
            errors.publicKey = 'Contact is duplicated.';
          }
        }
      }
    }

    if (values.memo && values.memo.length > 20) {
      errors.memo = 'Memo is too large.';
    }

    return errors;
  };

  const onSubmit = (values: Contact) => {
    editContactAction(contact, values);

    onClose();

    return {};
  };

  return (
    <ChildContainer>
      {titlePage ? (
        <PageTitle
          title="Edit contact"
          padding="0"
          titleStyle="font-bold"
        />
      ) : (
        <>{children}</>
      )}
      <div>
        <Form
          validate={validateForm}
          onSubmit={onSubmit}
          initialValues={{
            name: contact.name,
            publicKey: contact.publicKey,
            memo: contact.memo || '',
          }}
          render={({
            invalid,
            pristine,
            submitting,
            submitError,
            handleSubmit,
          }) => (
            <form
              className="form"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <Field name="name">
                {({ input, meta }) => (
                  <div className="mt-[24px]">
                    <ChildLabel>Name</ChildLabel>
                    <Input
                      type="text"
                      placeholder="John"
                      size="medium"
                      input={input}
                      meta={meta}
                      autoFocus
                    />
                  </div>
                )}
              </Field>

              <Field name="publicKey">
                {({ input, meta }) => (
                  <div className="mt-[14px]">
                    <ChildLabel>Address</ChildLabel>
                    <Input
                      type="text"
                      placeholder="G..."
                      size="medium"
                      input={input}
                      meta={meta}
                    />
                  </div>
                )}
              </Field>

              <Field name="memo">
                {({ input, meta }) => (
                  <div className="mt-[18px]">
                    <ChildLabel>
                      Memo
                      <span className="ml-[2px] text-xs text-primary-dark">
                        (optional)
                      </span>
                    </ChildLabel>

                    <Input
                      type="text"
                      placeholder="My friend"
                      size="medium"
                      input={input}
                      meta={meta}
                    />
                  </div>
                )}
              </Field>
              {submitError && <Error>{submitError}</Error>}

              <ButtonContainer
                btnSize={100}
                mt={34}
                positionStyles={{
                  bottom: usage === 'extension' ? '47px' : '32px',
                }}
                justify="end"
                gap={5}
              >
                <Button
                  variant="default"
                  size="medium"
                  content="Cancel"
                  onClick={onClose}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="medium"
                  content="Save"
                  disabled={pristine || submitting || invalid}
                />
              </ButtonContainer>
            </form>
          )}
        />
      </div>
    </ChildContainer>
  );
};

EditContact.defaultProps = {
  titlePage: true,
  children: '',
};
export default EditContact;

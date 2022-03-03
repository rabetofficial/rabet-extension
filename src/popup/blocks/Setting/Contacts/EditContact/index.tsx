import React from 'react';
import { StrKey } from 'stellar-sdk';
import { Form, Field } from 'react-final-form';

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
  TitlePage?: boolean;
  onClose: () => void;
};

const EditContact = ({
  contact,
  TitlePage,
  onClose,
}: EditContactType) => {
  const accounts = useTypedSelector((store) => store.accounts);

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
      {TitlePage ? (
        <PageTitle
          title="Edit contact"
          padding="0"
          titleStyle="font-bold"
        />
      ) : (
        ''
      )}
      <div>
        <Form
          validate={validateForm}
          onSubmit={onSubmit}
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
                      defaultValue={contact.name}
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
                      autoFocus
                      defaultValue={contact.publicKey}
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
                      autoFocus
                      defaultValue={contact.memo || ''}
                    />
                  </div>
                )}
              </Field>
              {submitError && <Error>{submitError}</Error>}

              <ButtonContainer
                btnSize={100}
                mt={34}
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
  TitlePage: true,
};
export default EditContact;

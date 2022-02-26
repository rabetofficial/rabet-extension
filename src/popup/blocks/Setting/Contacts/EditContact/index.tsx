import React from 'react';
import styled from 'styled-components';
import Button from 'popup/components/common/Button';
import Input from 'popup/components/common/Input';
import { Form, Field } from 'react-final-form';
import ButtonContainer from 'popup/components/common/ButtonContainer';
import PageTitle from 'popup/components/PageTitle';

type EditContactType = {
  children?: React.ReactNode;
  onClick: () => void;
  onClose: () => void;
  onSubmit: () => void;
};
const EditContact = ({
  children,
  onClick,
  onClose,
  onSubmit,
}: EditContactType) => (
  <Container>
    {children}
    <div>
      <Form
        onSubmit={onSubmit}
        render={({
          submitError,
          handleSubmit,
          submitting,
          pristine,
        }) => (
          <form
            className="form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <Field name="Name">
              {({ input, meta }) => (
                <div className="mt-[24px]">
                  <Label>Name</Label>
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

            <Field name="Address">
              {({ input, meta }) => (
                <div className="mt-[14px]">
                  <Label>Address</Label>
                  <Input
                    type="text"
                    placeholder="G ..."
                    size="medium"
                    input={input}
                    meta={meta}
                    autoFocus
                  />
                </div>
              )}
            </Field>

            <Field name="Name">
              {({ input, meta }) => (
                <div className="mt-[18px]">
                  <Label>
                    Memo
                    <span className="ml-[2px] text-xs text-primary-dark">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="G ..."
                    size="medium"
                    input={input}
                    meta={meta}
                    autoFocus
                  />
                </div>
              )}
            </Field>
            {submitError && (
              <div className="error">{submitError}</div>
            )}

            <ButtonContainer btnSize={100} mt={34} justify="end">
              <Button
                variant="default"
                size="medium"
                content="Cancel"
                onClick={onClose}
                style={{ marginRight: '5px' }}
              />
              <Button
                type="submit"
                variant="primary"
                size="medium"
                content="Save"
                disabled={pristine || submitting}
                onClick={onClick}
              />
            </ButtonContainer>
          </form>
        )}
      />
    </div>
  </Container>
);

const Container = styled.div`
  padding: 18px 32px 24px;
`;

const Label = styled.div`
  font-size: 16px;
  margin-bottom: -2px;
  font-weight: 500;
  @media (max-width: 360px) {
    margin-top: 22px;
  }
`;
EditContact.defaultProps = {
  children: (
    <PageTitle
      title="Edit contact"
      padding="0"
      titleStyle="font-bold"
    />
  ),
};
export default EditContact;

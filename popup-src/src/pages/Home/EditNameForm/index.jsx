import React from 'react';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import penSrc from '../../../assets/images/pen-edit.svg';
import { buttonTypes, inputSize } from '../../../staticRes/enum';
import currentActiveAccount from '../../../helpers/activeAccount';
import changeNameAction from '../../../actions/accounts/changeName';

import styles from '../styles.less';

const EditNameForm = ({ editName, setEditName }) => {
  const onSubmit = (values) => {
    changeNameAction(values.name);

    setEditName(!editName);
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = null;
    }

    return errors;
  };

  const { activeAccount, activeAccountIndex } = currentActiveAccount();

  return (
    <div>
      <label className="label-secondary">Name</label>
      {editName ? (
        <Form
          onSubmit={(values) => onSubmit(values)}
          validate={(values) => validateForm(values)}
          render={({ submitError, handleSubmit }) => (
            <form
              className={classNames(styles.form, 'form pure-g')}
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <div className={styles.field}>
                <Field
                  name="name"
                  initialValue={activeAccount.name || `Account ${activeAccountIndex + 1}`}
                >
                  {({ input, meta }) => (
                    <Input
                      type="text"
                      size={inputSize.small}
                      style={{ width: '137px', marginTop: '0' }}
                      input={input}
                      meta={meta}
                      autoFocus
                    />
                  )}
                </Field>
                {submitError && <div className="error">{submitError}</div>}
              </div>
              <Button
                type="submit"
                variant={buttonTypes.primary}
                content={<span className="icon-checkmark" />}
                className={styles.btn}
              />
            </form>
          )}
        />
      ) : (
        <p className={styles.info}>
          {(activeAccount.name
            && (activeAccount.name.length < 13
              ? activeAccount.name
              : activeAccount.name.substr(0, 13).concat('...')))
            || `Account ${activeAccountIndex + 1}`}
          <span
            className={styles.edit}
            onClick={() => { setEditName(!editName); }}
          >
            <img src={penSrc} alt="icon" />
          </span>
        </p>
      )}
    </div>
  );
};

export default EditNameForm;

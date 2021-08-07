import React from 'react';
import classNames from "classnames";

import Header from "Root/components/Header";
import PageTitle from "Root/components/PageTitle";
import Note from "Root/components/Note";
import Button from "Root/components/Button";

import styles from "./styles.less";

const message = "Please note that by clicking on the Delete button all the information for this account will be deleted from your browser. So please make sure you have a backup of the private key for this account.";
const deleteBtn = <><span className="icon-trash" />Delete</>;

const DeleteAccount = () => {
    return (
        <div>
            <Header />
            <PageTitle title="Delete account" />
            <div className={classNames("content", styles.content)}>
                <Note text={message} variant="warn" />
                <div className={ classNames('pure-g justify-end', styles.buttons) }>
                    <Button
                        variant="btn-default"
                        size="btn-medium"
                        content="Cancel"
                    />
                    <Button
                        type="button"
                        variant="btn-danger"
                        size="btn-medium"
                        content={deleteBtn}
                    />
                </div>
            </div>
        </div>
    );
};

export default DeleteAccount;
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classNames from 'classnames';

import Tooltip from '../Tooltip';

import styles from './styles.less';

type CopyTextTypes = {
  text: string;
  button?: boolean | any;
  copyButton?: boolean;
};

const CopyText = (props: CopyTextTypes) => {
  const { text, button, copyButton } = props;

  const [visible, setVisible] = useState(false);

  const [tooltipText, setText] = useState('Copy to clipboard');

  const toggle = () => {
    setText('Copied!');
    setVisible(true);
  };

  const setCopyBtn = () => {
    if (button) {
      return <span>{button}</span>;
    }

    if (copyButton) {
      return (
        <div className={styles.btn}>
          <span className="icon-sheet" />
          Copy
        </div>
      );
    }

    return <span className="icon-sheet" />;
  };

  return (
    <span
      onMouseEnter={() => {
        setVisible(true);
      }}
      onMouseLeave={() => {
        setVisible(false);
        setText('Copy to clipboard');
      }}
      onClick={() => {
        toggle();
      }}
      className={classNames(
        styles.container,
        copyButton && styles.block,
      )}
    >
      <Tooltip
        trigger={['click', 'hover']}
        tooltipShown={visible}
        tooltip={tooltipText}
        placement="top"
        styleClass="tooltip-copy"
      >
        <CopyToClipboard text={text}>{setCopyBtn()}</CopyToClipboard>
      </Tooltip>
    </span>
  );
};

CopyText.defaultProps = {
  button: '',
  copyButton: false,
};

export default CopyText;

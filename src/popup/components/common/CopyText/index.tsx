import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Tooltips from 'popup/components/common/Tooltips';
import Copy from 'popup/svgs/Copy';

import StyledButton from './styles';

type AppProps = {
  text: string;
  custom?: React.ReactNode;
  fullIcon?: boolean;
};

const CopyText = ({ text, custom, fullIcon }: AppProps) => {
  const [visible, setVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState('Copy to clipboard');

  const toggle = () => {
    setTooltipText('Copied!');
    setVisible(true);
  };

  const renderCopyTrigger = () => {
    if (custom) {
      return custom;
    }

    if (fullIcon) {
      return (
        <StyledButton type="button">
          <Copy />
          Copy
        </StyledButton>
      );
    }

    return <Copy />;
  };

  const onMouseEnter = () => setVisible(true);
  const onMouseLeave = () => {
    setVisible(false);
    setTooltipText('Copy to clipboard');
  };

  return (
    <span
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={toggle}
      className="cursor-pointer"
    >
      <Tooltips
        text={tooltipText}
        placement="top"
        isVisible={visible}
        controlled
      >
        <CopyToClipboard text={text}>
          {renderCopyTrigger()}
        </CopyToClipboard>
      </Tooltips>
    </span>
  );
};

CopyText.defaultProps = {
  custom: null,
  fullIcon: false,
};

export default CopyText;

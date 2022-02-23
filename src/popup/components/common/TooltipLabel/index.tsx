import React from 'react';
import styled from 'styled-components';
import Tooltip from 'popup/components/common/Tooltips';
import CircleQuestion from 'popup/svgs/CircleQuestion';

const Label = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: black;
  display: flex;
  align-items: center;

  svg {
    margin-left: 4px;
    cursor: pointer;
  }
`;

type AppProps = {
  text: string;
  tooltipText: string;
  className?: string;
};

const TooltipLabel = ({ text, tooltipText, className }: AppProps) => (
  <Label className={className}>
    <span className="whitespace-nowrap">{text}</span>
    <Tooltip text={tooltipText} placement="top">
      <span>
        <CircleQuestion />
      </span>
    </Tooltip>
  </Label>
);

TooltipLabel.defaultProps = {
  className: '',
};

export default TooltipLabel;

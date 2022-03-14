import React from 'react';
import Tippy from '@tippyjs/react';
import { roundArrow } from 'tippy.js';
import styled from 'styled-components';

import { FullPlacement } from 'popup/models';

type AppProps = {
  children: React.ReactNode;
  placement?: FullPlacement;
  className?: string;
  onHide?: () => void;
  visible: boolean;
  hideFunc: () => void;
  triggerElement?: React.ReactNode;
  maxWidth?: number | string;
  parent?: any;
  arrow?: boolean;
};

const Container = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.rounded.main};
  box-shadow: rgba(134, 146, 164, 0.08);
  border: none;
  overflow: hidden;
`;

const Popover = ({
  children,
  placement,
  className,
  onHide,
  visible,
  hideFunc,
  triggerElement,
  maxWidth,
  parent,
  arrow,
}: AppProps) => (
  <Tippy
    content={<Container className={className}>{children}</Container>}
    placement={placement}
    animation="shift-away"
    arrow={arrow ? roundArrow : false}
    interactive
    onHide={onHide}
    visible={visible}
    onClickOutside={hideFunc}
    maxWidth={maxWidth}
    className="test"
    appendTo={parent}
  >
    <div>{triggerElement}</div>
  </Tippy>
);

Popover.defaultProps = {
  placement: 'top',
  className: '',
  onHide: () => {},
  triggerElement: null,
  maxWidth: 'none',
  parent: document.body,
  arrow: true,
};

export default Popover;

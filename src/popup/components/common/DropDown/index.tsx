import Tippy from '@tippyjs/react';
import React, { useState } from 'react';

import AngleDown from 'popup/svgs/AngleDown';
import { ElementOption } from 'popup/models';

import * as S from './styles';

type AppProps = {
  width?: number;
  buttonClassName?: string;
  items: ElementOption[];
  selected: ElementOption;
  onChange: (current: ElementOption) => void;
};

const DropDown = ({
  width,
  items,
  buttonClassName,
  selected,
  onChange,
}: AppProps) => {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const handleOption = (item: ElementOption) => {
    onChange(item);
    hide();
  };

  return (
    <Tippy
      content={
        <S.Content
          style={{ width: width === 0 ? '100%' : `${width}px` }}
        >
          {items.map((item) => (
            <li
              key={item.value.trim()}
              onClick={() => handleOption(item)}
            >
              {item.label}
            </li>
          ))}
        </S.Content>
      }
      placement="bottom"
      animation="shift-away"
      arrow
      theme="light-border"
      appendTo="parent"
      interactive
      visible={visible}
      onClickOutside={hide}
    >
      <S.Button
        type="button"
        className={`dropdown ${buttonClassName}`}
        onClick={visible ? hide : show}
      >
        {selected && selected.label}
        <AngleDown />
      </S.Button>
    </Tippy>
  );
};

DropDown.defaultProps = {
  width: 0,
  buttonClassName: '',
};

export default DropDown;

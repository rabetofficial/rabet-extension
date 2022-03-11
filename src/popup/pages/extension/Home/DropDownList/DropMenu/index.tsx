import React, { useState } from 'react';

import * as S from './styles';

type AppProps = {
  children: React.ReactNode;
  width: number;
  items: any[];
};

const DropMenu = ({ children, width, items }: AppProps) => {
  const [active, setActive] = useState(false);
  const toggle = () => setActive(!active);
  const close = () => setActive(false);

  return (
    <div className="relative">
      <S.DropMenu tabIndex={0} onBlur={close}>
        <S.Toggle className={active ? 'active' : ''} onClick={toggle}>
          {children}
        </S.Toggle>
        <S.Menu
          className={active ? 'expanded' : 'collapsed'}
          style={{ width: active ? `${width}px` : 'auto' }}
        >
          <ul>
            {items.map((i) => (
              <li
                className={i.className}
                key={i.id}
                onClick={() => {
                  i.onClick();
                  toggle();
                }}
              >
                <>
                  {typeof i.icon === 'string' ? (
                    <i className={i.icon} />
                  ) : (
                    i.icon
                  )}
                </>
                <span className="ml-2">{i.label}</span>
              </li>
            ))}
          </ul>
        </S.Menu>
      </S.DropMenu>
    </div>
  );
};

export default DropMenu;

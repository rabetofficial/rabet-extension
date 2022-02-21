import React, { useState } from 'react';

import { Tab } from 'popup/models';

import * as S from './styles';

type AppProps = {
  data: Tab[];
  titleClass?: string;
  contentClass?: string;
  isEqualWidth?: boolean;
};

const Tabs = ({
  data,
  titleClass,
  contentClass,
  isEqualWidth,
}: AppProps) => {
  const [visibleTab, setVisibleTab] = useState(data[0].id);
  const width = 100 / data.length;

  const listContent = data.map(
    (item: Tab) =>
      visibleTab === item.id && (
        <div key={item.id}>{item.content}</div>
      ),
  );

  const handleTab = (item: Tab) => {
    setVisibleTab(item.id);
  };

  return (
    <>
      <S.Tabs className={titleClass}>
        {data.map((item: Tab) => (
          <S.TabTitle
            key={`${item.title}${item.id}`}
            onClick={() => handleTab(item)}
            className={visibleTab === item.id ? 'active' : ''}
            style={{ width: isEqualWidth ? `${width}%` : 'auto' }}
          >
            {item.title}
          </S.TabTitle>
        ))}
      </S.Tabs>
      <S.TabContent className={contentClass}>
        {listContent}
      </S.TabContent>
    </>
  );
};

Tabs.defaultProps = {
  titleClass: '',
  contentClass: '',
  isEqualWidth: false,
};

export default Tabs;

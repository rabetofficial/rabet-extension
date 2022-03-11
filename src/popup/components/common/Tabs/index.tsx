import React, { CSSProperties, useState } from 'react';
import classNames from 'classnames';

import { Tab } from 'popup/models';

import * as S from './styles';

type AppProps = {
  data: Tab[];
  titleClass?: string;
  contentClass?: string;
  isEqualWidth?: boolean;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
};

const Tabs = ({
  data,
  style,
  titleClass,
  contentClass,
  contentStyle,
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
      <S.Tabs style={style}>
        {data.map((item: Tab) => (
          <S.TabTitle
            key={`${item.title}${item.id}`}
            onClick={() => handleTab(item)}
            className={classNames(
              visibleTab === item.id ? 'active' : '',
              titleClass,
            )}
            style={{ width: isEqualWidth ? `${width}%` : 'auto' }}
          >
            {item.title}
          </S.TabTitle>
        ))}
      </S.Tabs>
      <S.TabContent className={contentClass} style={contentStyle}>
        {listContent}
      </S.TabContent>
    </>
  );
};

Tabs.defaultProps = {
  style: {},
  titleClass: '',
  contentClass: '',
  isEqualWidth: false,
  contentStyle: {},
};

export default Tabs;

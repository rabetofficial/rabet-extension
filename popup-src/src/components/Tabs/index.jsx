import shortid from 'shortid';
import React, { useState } from 'react';

import styles from './styles.less';

const Tabs = ({ data, tabTitleStyle }) => {
  const [visibleTab, setVisibleTab] = useState(data[0].id);
  const useForceUpdate = () => useState()[1];
  const forceUpdate = useForceUpdate();

  const width = (100 / data.length);

  const listContent = data.map((item) => (visibleTab === item.id)
  && <div key={item.title}>{item.tabContent}</div>);

  return (
    <div className={styles.tab}>
      <div className="tabs">
        <ul className="tabs-titles" style={tabTitleStyle}>
          {data.map((item) => (
            <li
              key={item.title + 'a'}
              onClick={() => { setVisibleTab(item.id); forceUpdate(); }}
              className={visibleTab === item.id ? 'tab-title tab-title-active' : 'tab-title'}
              style={{ width: `${width}%` }}
            >
              {item.tabTitle}
            </li>
          ))}
        </ul>
        <div className="tab-content">
          {listContent}
        </div>
      </div>
    </div>
  );
};

Tabs.propTypes = {

};

export default Tabs;

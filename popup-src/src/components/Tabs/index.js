import React, {useState} from 'react';
import PropTypes from 'prop-types';
import FocusLock, { AutoFocusInside } from 'react-focus-lock';
import styles from './styles.less';

const Tabs = ({data, tabTitleStyle}) => {
  const [visibleTab, setVisibleTab] = useState(data[0].id);
  const useForceUpdate = () => useState()[1];
  const forceUpdate = useForceUpdate();


  const width = (100 / data.length);

  const listContent = data.map((item, index) => (visibleTab === item.id) && <div key={index}>{item.tabContent}</div>);

  return (
      <div className={ styles.tab }>
        <div className="tabs">
          <ul className="tabs-titles" style={ tabTitleStyle }>
            {data.map((item, index) => (
               <li
                 key={ index }
                 onClick={ () => {setVisibleTab(item.id); forceUpdate();} }
                 className={ visibleTab === item.id ? 'tab-title tab-title-active' : 'tab-title' }
                 style={ {width: `${width}%`} }
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

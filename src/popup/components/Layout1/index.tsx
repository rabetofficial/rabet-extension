import React from 'react';
import classNames from 'classnames';

import styles from './styles.less';

type Layout1Props = {
  children: JSX.Element | JSX.Element[]
  alignCenter: boolean
}

const Layout1 = ({ children, alignCenter }: Layout1Props) => (
  <div className={`flex h-screen justify-center ${alignCenter ? 'place-items-center' : ' '}`}>
    <div className={classNames('2xl:basis-1/3 mt-14 xl:basis-1/3 lg:basis-2/5 md:basis-2/4 sm:basis-3/5 basis-11/12', styles.container)}>
      {children}
    </div>
  </div>
);

export default Layout1;

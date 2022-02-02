import React, { useEffect } from 'react';
import classNames from 'classnames';
import SlidesLayout from './SlidesLayout';

type LayoutProps = {
  children: JSX.Element | JSX.Element[];
  alignCenter?: boolean;
  className?: string;
  isDashboard?: boolean;
};

const Layout = ({
  children,
  alignCenter,
  className,
  isDashboard,
}: LayoutProps) => {
  useEffect(() => {
    if (isDashboard) {
      document.body.className = 'dashboard';
    }
    return () => {
      document.body.className = '';
    };
  });
  return (
    <>
      {isDashboard ? (
        children
      ) : (
        <div
          className={classNames(
            `flex h-screen justify-center ${
              alignCenter ? 'place-items-center' : ' '
            }`,
            className,
          )}
        >
          <div className="2xl:basis-[470px] 2xl:mt-[55px] xl:basis-[470px] lg:basis-[470px] md:basis-[470px] sm:basis-3/5 basis-11/12">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

Layout.defaultProps = {
  alignCenter: false,
  className: '',
  isDashboard: true,
};

export default Layout;
export { SlidesLayout };

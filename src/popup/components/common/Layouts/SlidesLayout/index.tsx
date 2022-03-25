import React from 'react';
import classNames from 'classnames';

type LayoutProps = {
  children: JSX.Element | JSX.Element[];
  alignCenter?: boolean;
  className?: string;
};

const Layout = ({
  children,
  alignCenter,
  className,
}: LayoutProps) => (
  <div
    className={classNames(
      `flex h-full justify-center ${
        alignCenter ? 'place-items-center' : ' '
      }`,
      className,
    )}
  >
    <div className="2xl:basis-[790px] xl:basis-[790px] lg:basis-[790px] md:basis-[790px] sm:basis-3/5 basis-11/12">
      {children}
    </div>
  </div>
);

Layout.defaultProps = {
  alignCenter: false,
  className: '',
};

export default Layout;

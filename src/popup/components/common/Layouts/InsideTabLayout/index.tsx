import React from 'react';

const InsideTabLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="flex">
    <div className="lg:basis-4/5 md:basis-full sm:basis-full basis-full">
      {children}
    </div>
  </div>
);

export default InsideTabLayout;

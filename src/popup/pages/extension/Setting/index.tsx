import React from 'react';
import SettingComponent from 'popup/blocks/Setting';
import Header from 'popup/components/common/Header';
import ExtTitle from 'popup/components/common/Title/Ext';

const Setting = () => (
  <>
    <Header />

    <div className="content">
      <ExtTitle title="Setting" className="mt-[20px]" />
      <SettingComponent />
    </div>
  </>
);

export default Setting;

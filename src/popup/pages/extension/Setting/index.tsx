import React from 'react';
import SettingComponent from 'popup/blocks/Setting';
import Header from 'popup/components/common/Header';

const Setting = () => (
  <>
    <Header />

    <div className="content mt-[24px]">
      <SettingComponent usage="extension" />
    </div>
  </>
);

export default Setting;

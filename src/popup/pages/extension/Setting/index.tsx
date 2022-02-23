import React from 'react';
import SettingGeneral from 'popup/blocks/Setting/General';
import Header from 'popup/components/common/Header';
import ExtTitle from 'popup/components/common/Title/Ext';

const Setting = () => (
  <>
    <Header />

    <div className="content">
      <ExtTitle title="Setting" className="mt-[20px]" />
      <SettingGeneral />
    </div>
  </>
);

export default Setting;

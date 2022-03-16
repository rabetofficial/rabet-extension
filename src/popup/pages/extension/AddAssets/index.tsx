import React from 'react';

import AddAsset from 'popup/blocks/AddAsset';
import Header from 'popup/components/common/Header';
import ExtTitle from 'popup/components/common/Title/Ext';

const AddAssets = () => (
  <>
    <Header />

    <div className="content">
      <ExtTitle title="Add assets" className="mt-[20px]" />
      <div className="mt-[6px]">
        <AddAsset usage="extension" />
      </div>
    </div>
  </>
);

export default AddAssets;

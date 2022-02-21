import React from 'react';
import Header from 'popup/components/common/Header';
import ExtTitle from 'popup/components/common/Title/Ext';
import AddAsset from 'popup/blocks/AddAsset';

const AddAssets = () => (
  <>
    <Header />
    <div className="content">
      <ExtTitle title="Add assets" className="mt-[20px]" />
      <div className="mt-[6px]">
        <AddAsset />
      </div>
    </div>
  </>
);

export default AddAssets;

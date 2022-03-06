import React from 'react';
import { connect } from 'react-redux';

import Card from 'popup/components/common/Card';
import Header from 'popup/components/common/Header';
import CopyKey from 'popup/components/common/CopyKey';
import ExtTitle from 'popup/components/common/Title/Ext';
import currentActiveAccount from 'popup/utils/activeAccount';

import * as S from './styles';

const PrivateKey = () => {
  const { activeAccount } = currentActiveAccount();

  return (
    <S.Note>
      <Header />

      <div className="content py-4">
        <ExtTitle title="Show private key" />
        <S.Msg>
          <span>Do not lose it!</span> It cannot be recovered if you
          lose it. <br />
          <span>Do not share it!</span> Your funds will be stolen if
          you use this file on a phishing site.
        </S.Msg>
        <div className="label-primary mb-[6px] mt-[32px] font-medium">
          Private Key
        </div>
        <S.Box>
          <Card type="primary">
            <CopyKey keyValue={activeAccount.privateKey} />
          </Card>
        </S.Box>
      </div>
    </S.Note>
  );
};

export default connect((state) => ({
  accounts: state.accounts,
}))(PrivateKey);

import React from 'react';
import { IAccount } from 'popup/reducers/accounts2';
import ScrollBar from 'popup/components/common/ScrollBar';
import Account from './Account';

import * as S from './styles';

type AppProps = {
  accounts: IAccount[];
};

const AccountList = ({ accounts }: AppProps) => (
  <>
    {accounts.length ? (
      <ScrollBar isHidden maxHeight={210}>
        <S.List>
          {accounts.map((account: IAccount) => (
            <li key={`accountsList${account.publicKey}`}>
              <Account account={account} />
            </li>
          ))}
        </S.List>
      </ScrollBar>
    ) : (
      <S.NotFound>No accounts found</S.NotFound>
    )}
  </>
);

export default AccountList;

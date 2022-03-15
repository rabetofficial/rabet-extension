import React from 'react';

import { Contact } from 'popup/reducers/contacts';
import { IAccount } from 'popup/reducers/accounts2';
import ScrollBar from 'popup/components/common/ScrollBar';

import * as S from './styles';
import Account from './Account';

export type AccountLike = IAccount | Contact;

type AppProps = {
  accounts: AccountLike[];
  onChange: (publicKey: string) => void;
};

const AccountList = ({ accounts, onChange }: AppProps) => (
  <>
    {accounts.length ? (
      <ScrollBar isHidden maxHeight={210}>
        <S.List>
          {accounts.map((account: AccountLike) => (
            <li
              key={`accountsList${account.publicKey}`}
              onClick={() => {
                onChange(account.publicKey);
              }}
            >
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

import React from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';

import Header from 'popup/components/common/Header';
import PageTitle from 'popup/components/PageTitle';
import currentActiveAccount from 'popup/utils/activeAccount';
import removeConnectedWebsitesAction from 'popup/actions/user/removeConnectedWebsites';

import * as S from './styles';
import ExtTitle from 'popup/components/common/Title/Ext';

const ConnectedWebsite = ({ user }) => {
  const { activeAccount } = currentActiveAccount();
  const { connectedWebsites } = user;
  const associatedWebsites = connectedWebsites.filter((x) =>
    x.includes(activeAccount.publicKey),
  );
  const websitesMapped = associatedWebsites.map(
    (x) => x.split('/')[0],
  );

  const removeConnectedWebsites = (web) => {
    const cw = `${web}/${activeAccount.publicKey}`;

    removeConnectedWebsitesAction(cw);
  };

  return (
    <div>
      <Header />
      <div className="content mt-4">
        <ExtTitle title="Connected website" />
        <S.Desc>
          List of websites that are allowed to interact with this
          account and get its public-key
        </S.Desc>
        <div>
          {websitesMapped.map((web) => (
            <S.Website key={shortid.generate()}>
              <S.Link href="#" rel="noreferrer">
                {web}
              </S.Link>
              <S.Icon
                className="icon-multiply"
                onClick={() => {
                  removeConnectedWebsites(web);
                }}
              />
            </S.Website>
          ))}
        </div>
      </div>
    </div>
  );
};

export default connect((store) => ({
  user: store.user,
}))(ConnectedWebsite);

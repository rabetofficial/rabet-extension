import React from 'react';

import Multiply from 'popup/svgs/Multiply';
import Header from 'popup/components/common/Header';
import ExtTitle from 'popup/components/common/Title/Ext';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import removeConnectedWebsitesAction from 'popup/actions/user/removeConnectedWebsites';

import * as S from './styles';

const ConnectedWebsite = () => {
  const { publicKey } = useActiveAccount();
  const { connectedWebsites } = useTypedSelector(
    (store) => store.user,
  );

  const associatedWebsites = connectedWebsites.filter((x) =>
    x.includes(publicKey),
  );
  const websitesMapped = associatedWebsites.map(
    (x) => x.split('/')[0],
  );

  const removeConnectedWebsites = (web: string) => {
    const cw = `${web}/${publicKey}`;

    removeConnectedWebsitesAction(cw);
  };

  return (
    <div style={{ maxWidth: '360px' }}>
      <Header />

      <div className="content mt-4">
        <ExtTitle title="Connected website" />

        <S.Desc>
          List of websites that are allowed to interact with this
          account and get its public-key
        </S.Desc>

        <div>
          {websitesMapped.map((web) => (
            <S.Website key={web}>
              <S.Link href="#" rel="noreferrer">
                {web}
              </S.Link>

              <div
                onClick={() => {
                  removeConnectedWebsites(web);
                }}
              >
                <S.Close>
                  <Multiply size={12} />
                </S.Close>
              </div>
            </S.Website>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectedWebsite;

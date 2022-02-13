import React from 'react';
import shortid from 'shortid';
import classNames from 'classnames';
import { connect } from 'react-redux';

import Header from 'popup/components/common/Header';
import PageTitle from 'popup/components/PageTitle';
import currentActiveAccount from 'popup/utils/activeAccount';
import removeConnectedWebsitesAction from 'popup/actions/user/removeConnectedWebsites';

import styles from './styles.less';

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
      <PageTitle title="Connected website" />
      <div className="content">
        <p className={styles.desc}>
          List of websites that are allowed to interact with this
          account and get its public-key
        </p>
        <div>
          {websitesMapped.map((web) => (
            <div key={shortid.generate()} className={styles.website}>
              <a href="#" rel="noreferrer" className={styles.link}>
                {web}
              </a>
              <span
                className={classNames('icon-multiply', styles.icon)}
                onClick={() => {
                  removeConnectedWebsites(web);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default connect((store) => ({
  user: store.user,
}))(ConnectedWebsite);

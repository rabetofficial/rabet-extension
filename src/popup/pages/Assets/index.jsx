import shortid from 'shortid';
import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Header from '../../components/Header';
import Button from '../../components/Button';
import * as route from '../../staticRes/routes';
import matchAsset from '../../utils/matchAsset';
import PageTitle from '../../components/PageTitle';
import addAssetAction from '../../actions/operations/addAsset';
import currentActiveAccount from '../../utils/activeAccount';
import getAssetWebsite from '../../utils/horizon/getAssetData';

import styles from './styles.less';

const Assets = () => {
  const { asset_code, asset_issuer } = useParams();
  const navigate = useNavigate();
  const [homeDomain, setHomeDomain] = useState('');
  const [flags, setFlags] = useState({
    auth_required: false,
    auth_revocable: false,
    auth_immutable: false,
  });

  const { activeAccount: { balances } } = currentActiveAccount();
  const asset = balances.find((x) => matchAsset(x, { asset_code, asset_issuer }));

  useEffect(() => {
    getAssetWebsite(asset).then((assetData) => {
      setFlags(assetData.flags);
      setHomeDomain(assetData.homeDomain);
    });
  }, []);

  const handleDelete = ({ code, issuer }) => {
    addAssetAction({ code, issuer, limit: '0' }, navigate);
  };

  const assetInfo = [
    { title: 'Assets code', value: asset_code },
    { title: 'Issuer', value: asset_issuer },
    {
      title: 'Website',
      value: homeDomain && (
        <a
          href={`https://${homeDomain}`}
          target="_blank"
          rel="noreferrer"
        >
          {homeDomain}
        </a>
      ),
    },
  ];

  const deleteBtn = (
    <>
      <span className="icon-trash" />
      Delete
    </>
  );

  return (
    <>
      <div className={classNames(styles.page, 'hidden-scroll content-scroll')}>
        <Header />
        <PageTitle title={`Asset | ${asset_code}`} />
        <div className="content">
          {assetInfo.map((item, index) => (
            <div key={shortid.generate()} className={styles.assets}>
              <h4 className={styles.title}>{item.title}</h4>
              <p className={styles.value}>{item.value}</p>
              {((assetInfo.length - 1) !== index) && <hr className={styles.hr} />}
            </div>
          ))}
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>Required</th>
                  <th>Revocable</th>
                  <th>Immutable</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{flags.auth_required ? 'True' : 'False'}</td>
                  <td>{flags.auth_revocable ? 'True' : 'False'}</td>
                  <td>{flags.auth_immutable ? 'True' : 'False'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {parseFloat(asset.balance) > 0 ? (
            <div className="error-box" style={{ marginTop: '16px' }}>
              You cannot remove this asset unless the asset&apos;s balance is zero.
            </div>
          ) : ''}
        </div>
      </div>
      <div className={classNames('pure-g justify-end', styles.buttons)}>
        <Button
          variant="btn-default"
          size="btn-medium"
          content="Cancel"
          onClick={() => {
            navigate(
              route.homePage,
              {
                state: {
                  alreadyLoaded: true,
                },
              },
            );
          }}
        />

        <Button
          type="button"
          variant="btn-danger"
          size="btn-medium"
          content={deleteBtn}
          disabled={parseFloat(asset.balance) > 0}
          onClick={() => {
            handleDelete({ code: asset_code, issuer: asset_issuer });
          }}
        />
      </div>
    </>
  );
};

export default connect((state) => ({
  accounts: state.accounts,
}))(Assets);

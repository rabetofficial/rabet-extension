import classNames from 'classnames';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import Header from 'Root/components/Header';
import Button from 'Root/components/Button';
import * as route from 'Root/staticRes/routes';
import PageTitle from 'Root/components/PageTitle';
import addAssetAction from 'Root/actions/operations/addAsset';
import currentActiveAccount from 'Root/helpers/activeAccount';
import getAssetWebsite from 'Root/helpers/horizon/getAssetData';

import styles from './styles.less';

class Assets extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      homeDomain: '',
      flags: {
        auth_required: false,
        auth_revocable: false,
        auth_immutable: false,
      },
    };
  }

  handleDelete({ code, issuer }) {
    addAssetAction({ code, issuer, limit: '0' }, this.props.history.push);
  }

  render() {
    const { activeAccount } = currentActiveAccount();

    const { balances } = activeAccount;
    const asset = balances.find(x =>
      x.asset_code === this.props.match.params.asset_code
      && x.asset_issuer === this.props.match.params.asset_issuer
    );

    getAssetWebsite(asset).then((assetData) => {
      this.setState({
        flags: assetData.flags,
        homeDomain: assetData.homeDomain,
      });
    });

    let currentData = {
      flags: this.state.flags,
    };

    currentData.asset = asset;

    const assetInfo = [
      { title: 'Assets code', value: asset.asset_code },
      { title: 'Issuer', value: asset.asset_issuer },
      {
        title: 'Website',
        value: this.state.homeDomain && <a href={`https://${this.state.homeDomain}`} target="_blank" rel="noreferrer">{this.state.homeDomain}</a>
      },
    ];

    const deleteBtn = <><span className="icon-trash" />{''}Delete</>;

    return (
        <>
          <div className={ classNames(styles.page, 'hidden-scroll content-scroll') }>
            <Header/>
            <PageTitle title={`Asset | ${asset.asset_code}`} />
            <div className="content">
              {assetInfo.map((item, index) => (
                  <div key={ index } className={ styles.assets }>
                    <h4 className={ styles.title }>{item.title}</h4>
                    <p className={ styles.value }>{item.value}</p>
                    {((assetInfo.length - 1) !== index) && <hr className={ styles.hr }/>}
                  </div>
              ))}
              <div className={ styles.table }>
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
                    <td>{currentData.flags.auth_required ? 'True' : 'False'}</td>
                    <td>{currentData.flags.auth_revocable ? 'True' : 'False'}</td>
                    <td>{currentData.flags.auth_immutable ? 'True' : 'False'}</td>
                  </tr>
                  </tbody>
                </table>
              </div>

              {parseFloat(asset.balance) > 0
                ? (
                  <div className="error-box" style={{marginTop: '16px'}}>
                    You cannot remove this asset unless the asset&apos;s balance is zero.
                  </div>
                ) : ''
              }
            </div>
          </div>
          <div className={ classNames('pure-g justify-end', styles.buttons) }>
            <Button
              variant="btn-default"
              size="btn-medium"
              content="Cancel"
              onClick={() => { this.props.history.push({
                pathname: route.homePage,
                state: {
                  alreadyLoaded: true,
                },
              }) }}
            />
            {/*<Button*/}
            {/*  variant="btn-primary"*/}
            {/*  size="btn-medium"*/}
            {/*  content="Add"*/}
            {/*/>*/}
            <Button
              type="button"
              variant="btn-danger"
              size="btn-medium"
              content={deleteBtn}
              disabled={parseFloat(asset.balance) > 0}
              onClick={() => { this.handleDelete({ code: asset.asset_code, issuer: asset.asset_issuer }) }}
            />
          </div>
        </>
    );
  }
}

export default withRouter(connect(state => ({
  accounts: state.accounts,
}))(Assets));

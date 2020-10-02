import classNames from 'classnames';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import Header from 'Root/components/Header';
import Button from 'Root/components/Button';
import PageTitle from 'Root/components/PageTitle';
import currentActiveAccount from 'Root/helpers/activeAccount';
import getAssetWebsite from 'Root/helpers/horizon/getAssetData';

import styles from './styles.less';

class Assets extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    console.log('deleted', this.state.asset);
  }

  render() {
    const { activeAccount, activeAccountIndex } = currentActiveAccount();

    const { balances } = activeAccount;
    const asset = balances.find(x => x.asset_code === this.props.match.params.asset_code);

    let currentData = {
      flags: {
        auth_required: false,
        auth_revocable: false,
        auth_immutable: false
      },
      homeDomain: '',
    };

    currentData.asset = asset;

    getAssetWebsite(asset).then((assetData) => {
      currentData.flags = assetData.flags;
      currentData.homeDomain = assetData.homeDomain;
    });

    const assetInfo = [
      { title: 'Assets code', value: asset.asset_code },
      { title: 'Issuer', value: asset.asset_issuer },
      { title: 'Website', value: currentData.homeDomain },
      { title: 'Assets type', value: asset.asset_type },
    ];

    const deleteBtn = <><span className="icon-trash" />{''}Delete</>;

    return (
        <>
          <div className={ classNames(styles.page, 'hidden-scroll content-scroll') }>
            <Header/>
            <PageTitle title={`Assets | ${asset.asset_code}`} />
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
            </div>
          </div>
          <div className={ classNames('pure-g justify-end', styles.buttons) }>
            <Button
              variant="btn-default"
              size="btn-medium"
              content="Cancel"
              onClick={() => {this.props.history.goBack()}}
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
              onClick={this.handleDelete}
            />
          </div>
        </>
    );
  }
}

export default withRouter(connect(state => ({
  accounts: state.accounts,
}))(Assets));

import classNames from 'classnames';
import randomColor from 'randomcolor';
import React, {Component} from 'react';
import {Field, Form} from 'react-final-form';
import { withRouter } from 'react-router-dom';

import config from 'Root/config';
import Input from 'Root/components/Input';
import Button from 'Root/components/Button';
import * as route from 'Root/staticRes/routes';
import sample from 'Root/assets/images/stellar.png';
import getAssetsAction from 'Root/helpers/server/getAssets';
import currentActiveAccount from 'Root/helpers/activeAccount';
import addMultipleAssets from 'Root/actions/operations/addMultipleAssets';

import styles from './styles.less';

const colorSetting = {luminosity: 'bright', format: 'rgba', alpha: 0.3, count: 5};

const colors = randomColor(colorSetting);

class SearchAsset extends Component {
  constructor() {
    super();
    this.state = {
      active: -1,
      list: [],
      value: '',
      selectedList: [],
    };

    this.setActive = this.setActive.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  setActive( index ) {
    const { list, selectedList } = this.state;

    if (selectedList.some(x => x.asset_code === list[index].asset_code && x.asset_issuer === list[index].asset_issuer)) {
      const newSelectedList = selectedList.filter(x => x.asset_code !== list[index].asset_code && x.asset_issuer !== list[index].asset_issuer);

      this.setState({
        selectedList: newSelectedList,
      });
    } else {
      this.setState((prevState) => ({
        selectedList: [
          ...prevState.selectedList,
          list[index],
        ],
      }))
    }
  }

  onSubmit (values) {
    addMultipleAssets(this.state.selectedList, this.props.history.push);
  }

  async validateForm (values) {
    if (values.token && this.state.value !== values.token) {
      this.setState({ value: values.token });

      const { activeAccount } = currentActiveAccount();
      const currentBalances = activeAccount.balances || [];

      getAssetsAction(values.token)
      .then(assetList => {
        let newAssetList = [];

        for (let i = 0; i < assetList.length; i++) {
          const isOld = currentBalances.some(x => x.asset_code === assetList[i].asset_code && x.asset_issuer === assetList[i].asset_issuer);

          if (isOld) {
            newAssetList.push({
              ...assetList[i],
              active: false,
            });
          } else {
            newAssetList.push({
              ...assetList[i],
              active: true,
            });
          }
        }

        this.setState({
          list: newAssetList,
        });
      })
    }
  }

  handleChange(e) {
    console.log(e)
  }

  render() {
    const listItem = this.state.list;
    const getClass = function( name, index ) {
      if (listItem.includes(index)) {
        return name + ' active';
      }
      return name;
    };

    return (
        <div className={styles.content}>
          <Form
              onSubmit={(values) => { this.onSubmit(values) }}
              validate={ (values) => { this.validateForm(values) } }
              render={ ({submitError, handleSubmit, submitting, values , form, pristine}) => (
                  <form className={ classNames(styles.form, 'form') } onSubmit={ handleSubmit }>
                    <Field name="token">
                      {({input, meta}) => (
                            <Input
                                type="text"
                                placeholder="&#xe915;&nbsp;&nbsp;Search tokens"
                                size="input-medium"
                                input={ input }
                                meta={ meta }
                                style={{fontFamily: 'Roboto, \'icomoon\''}}
                                autoFocus
                            />
                      )}
                    </Field>
                    <h6 className={styles.result}>Search result</h6>
                    <ul className={classNames(styles.list, 'hidden-scroll', styles.scroll)}>
                      {listItem.map((item, index) => (
                          <li
                              key={index}
                              className={getClass(styles.item, index)}
                              aria-disabled={!item.active}
                              onClick={() => item.active && this.setActive(index)}
                          >
                            <div className={styles.logo} style={{backgroundColor: `${item.color}`}} >
                              <img src={`${config.ASSET_SERVER}/uploads/${item.logo}`} alt="logo"/>
                            </div>
                            <h4 className={styles.name}>{item.asset_code}</h4>
                            <p className={styles.web}>{item.home_domain}</p>
                          </li>
                      ))}
                    </ul>
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

                      <Button
                          type="submit"
                          variant="btn-primary"
                          size="btn-medium"
                          content="Add"
                          disabled={!this.state.selectedList.length}
                      />
                    </div>
                  </form>
              )}
          />
        </div>
    );
  }
}

export default withRouter(SearchAsset);

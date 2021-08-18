import shortid from 'shortid';
import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import { withRouter } from 'react-router-dom';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import * as route from '../../../staticRes/routes';
import getAssetsAction from '../../../helpers/server/getAssets';
import currentActiveAccount from '../../../helpers/activeAccount';
import addMultipleAssets from '../../../actions/operations/addMultipleAssets';
import checkedSrc from '../../../assets/images/checked.svg';
import questionSrc from '../../../assets/images/question-circle.png';

import styles from './styles.less';

class SearchAsset extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      value: '',
      selectedList: [],
    };

    this.setActive = this.setActive.bind(this);
  }

  onSubmit() {
    const { history } = this.props;
    const { selectedList } = this.state;

    addMultipleAssets(selectedList, history.push);
  }

  setActive(index) {
    const { list, selectedList } = this.state;

    if (selectedList.some((x) => x.asset_code === list[index].asset_code
    && x.asset_issuer === list[index].asset_issuer)) {
      const newSelectedList = selectedList.filter((x) => x.asset_issuer
      !== list[index].asset_issuer);

      this.setState({
        selectedList: newSelectedList,
      });
    } else {
      this.setState((prevState) => ({
        selectedList: [...prevState.selectedList, list[index]],
      }));
    }
  }

  async validateForm(values) {
    const { value, list } = this.state;

    if (values.token && value !== values.token) {
      this.setState({ value: values.token });

      const { activeAccount } = currentActiveAccount();
      const currentBalances = activeAccount.balances || [];

      getAssetsAction(values.token).then((assetList) => {
        const newAssetList = [];

        for (let i = 0; i < assetList.length; i += 1) {
          const isOld = currentBalances.some((x) => x.asset_code === assetList[i].asset_code
          && x.asset_issuer === assetList[i].asset_issuer);

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
      });
    } else if (!values.token && list.length) {
      this.setState({
        list: [],
        selectedList: [],
        value: '',
      });
    }
  }

  render() {
    const { options, history } = this.props;
    const { list: listItem, selectedList } = this.state;

    return (
      <div className={styles.content}>
        <Form
          onSubmit={(values) => {
            this.onSubmit(values);
          }}
          validate={(values) => {
            this.validateForm(values);
          }}
          render={({ handleSubmit, form }) => (
            <form className={classNames(styles.form, 'form')} onSubmit={handleSubmit} autoComplete="off">
              <Field name="token">
                {({ input, meta }) => (
                  <Input
                    type="text"
                    placeholder="&#xe915;&nbsp;&nbsp;Search assets"
                    size="input-medium"
                    input={input}
                    meta={meta}
                    style={{ fontFamily: "Roboto, 'icomoon'" }}
                    autoFocus
                    disabled={options.network !== 'MAINNET'}
                  />
                )}
              </Field>
              <h6 className={styles.result}>Search result</h6>
              <ul className={classNames(styles.list, 'hidden-scroll', styles.scroll)}>
                {listItem.map((item, index) => (
                  <li
                    key={shortid.generate()}
                    className={styles.item}
                    aria-disabled={!item.active}
                    onClick={() => item.active && this.setActive(index)}
                    style={{
                      border: item.active && selectedList.includes(item) && '1px solid black',
                    }}
                  >
                    <div className={styles.logo} style={{ backgroundColor: `${item.color}` }}>
                      {item.logo ? <img src={`${item.logo}`} alt="logo" /> : <img src={questionSrc} alt="icon" /> }
                    </div>
                    <h4 className={styles.name}>{item.asset_code}</h4>
                    &nbsp;
                    <p className={styles.web}>
                      {item.domain ? item.domain : '-'}
                    </p>
                    {item.is_verified == '1'
                      ? <img src={checkedSrc} className={styles.checked} alt="icon" />
                      : ''}
                  </li>
                ))}
              </ul>
              <div className={classNames('pure-g justify-end', styles.buttons)}>
                <Button
                  variant="btn-default"
                  size="btn-medium"
                  content="Cancel"
                  onClick={() => {
                    history.push({
                      pathname: route.homePage,
                      state: {
                        alreadyLoaded: true,
                      },
                    });
                  }}
                />

                <Button
                  type="submit"
                  variant="btn-primary"
                  size="btn-medium"
                  content="Add"
                  disabled={!selectedList.length}
                />
              </div>
            </form>
          )}
        />
      </div>
    );
  }
}

export default withRouter(
  connect((state) => ({
    options: state.options,
  }))(SearchAsset),
);

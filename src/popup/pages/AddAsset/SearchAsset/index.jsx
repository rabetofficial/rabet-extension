import shortid from 'shortid';
import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import * as route from '../../../staticRes/routes';
import matchAsset from '../../../utils/matchAsset';
import checkedSrc from '../../../../assets/images/checked.svg';
import getAssetsAction from '../../../utils/server/getAssets';
import currentActiveAccount from '../../../utils/activeAccount';
import questionSrc from '../../../../assets/images/question-circle.png';
import addMultipleAssets from '../../../actions/operations/addMultipleAssets';

import styles from './styles.less';

const SearchAsset = ({ options }) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');
  const [selectedList, setSelectedList] = useState([]);

  const onSubmit = () => {
    addMultipleAssets(selectedList, navigate);
  };

  const setActive = (index) => {
    if (selectedList.some((x) => matchAsset(x, list[index]))) {
      const newSelectedList = selectedList.filter(
        (x) => x.asset_issuer !== list[index].asset_issuer,
      );

      setSelectedList(newSelectedList);
    } else {
      setSelectedList([...selectedList, list[index]]);
    }
  };

  const validateForm = async (values) => {
    if (values.token && value !== values.token) {
      setValue(values.token);

      const { activeAccount } = currentActiveAccount();
      const currentBalances = activeAccount.balances || [];

      getAssetsAction(values.token).then((assetList) => {
        const newAssetList = [];

        for (let i = 0; i < assetList.length; i += 1) {
          const isOld = currentBalances.some((x) =>
            matchAsset(x, assetList[i]),
          );

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

        setList(newAssetList);
      });
    } else if (!values.token && list.length) {
      setList([]);
      setSelectedList([]);
      setValue('');
    }
  };

  return (
    <div className={styles.content}>
      <Form
        onSubmit={(values) => {
          onSubmit(values);
        }}
        validate={(values) => {
          validateForm(values);
        }}
        render={({ handleSubmit }) => (
          <form
            className={classNames(styles.form, 'form')}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
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
            <ul
              className={classNames(
                styles.list,
                'hidden-scroll',
                styles.scroll,
              )}
            >
              {list.map((item, index) => (
                <li
                  key={shortid.generate()}
                  className={styles.item}
                  aria-disabled={!item.active}
                  onClick={() => item.active && setActive(index)}
                  style={{
                    border:
                      item.active &&
                      selectedList.includes(item) &&
                      '1px solid black',
                  }}
                >
                  <div
                    className={styles.logo}
                    style={{ backgroundColor: `${item.color}` }}
                  >
                    {item.logo ? (
                      <img src={`${item.logo}`} alt="logo" />
                    ) : (
                      <img src={questionSrc} alt="icon" />
                    )}
                  </div>
                  <h4 className={styles.name}>{item.asset_code}</h4>
                  &nbsp;
                  <p className={styles.web}>
                    {item.domain ? item.domain : '-'}
                  </p>
                  {item.is_verified == '1' ? (
                    <img
                      src={checkedSrc}
                      className={styles.checked}
                      alt="icon"
                    />
                  ) : (
                    ''
                  )}
                </li>
              ))}
            </ul>
            <div
              className={classNames(
                'pure-g justify-end',
                styles.buttons,
              )}
            >
              <Button
                variant="btn-default"
                size="btn-medium"
                content="Cancel"
                onClick={() => {
                  navigate(route.homePage, {
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
};

export default connect((state) => ({
  options: state.options,
}))(SearchAsset);

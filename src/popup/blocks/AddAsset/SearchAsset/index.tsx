import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import ButtonContainer from 'popup/components/common/ButtonContainer';
import Input from 'popup/components/common/Input';
import Button from 'popup/components/common/Button';
import * as route from 'popup/staticRes/routes';
import matchAsset from 'popup/utils/matchAsset';
import getAssetsAction from 'popup/utils/server/getAssets';
import currentActiveAccount from 'popup/utils/activeAccount';
import addMultipleAssets from 'popup/actions/operations/addMultipleAssets';
import isEmpty from '../../../../helpers/isEmpty';
import AssetList from './AssetList';

import * as S from './styles';

type FormValues = {
  token: string;
};

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

  const validateForm = async (values: FormValues) => {
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
    <Form
      onSubmit={onSubmit}
      validate={(values: FormValues) => {
        validateForm(values);
      }}
      render={({ handleSubmit }) => (
        <form
          className="form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Field name="token">
            {({ input, meta }) => (
              <Input
                type="text"
                placeholder="&#xe915;&nbsp;&nbsp;Search assets"
                size="medium"
                input={input}
                meta={meta}
                style={{ fontFamily: "Roboto, 'icomoon'" }}
                autoFocus
                disabled={options.network !== 'MAINNET'}
              />
            )}
          </Field>

          {!isEmpty(list) ? (
            <div>
              <S.ResultTitle>Search result</S.ResultTitle>
              <AssetList
                list={list}
                setActive={setActive}
                selectedList={selectedList}
              />

              <ButtonContainer btnSize={100} justify="end" mt={24}>
                <Button
                  variant="default"
                  size="medium"
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
                  variant="primary"
                  size="medium"
                  content="Add"
                  disabled={!selectedList.length}
                />
              </ButtonContainer>
            </div>
          ) : null}
        </form>
      )}
    />
  );
};

export default connect((state) => ({
  options: state.options,
}))(SearchAsset);

import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import isValidDomain from 'is-valid-domain';

import isEmpty from 'helpers/isEmpty';
import Input from 'popup/components/common/Input';
import Button from 'popup/components/common/Button';
import getAssetsAction from 'popup/api/getSearchedAssets';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import { AssetImageWithActive } from 'popup/reducers/assetImages';

import ButtonContainer from 'popup/components/common/ButtonContainer';

import ResultTitle from './styles';
import AssetList from './AssetList';

type FormValues = {
  asset: string;
};

type AppProps = {
  onSubmit: (x: AssetImageWithActive[]) => void;
  onCancel: () => void;
};

const SearchAsset = ({ onSubmit, onCancel }: AppProps) => {
  const [list, setList] = useState<AssetImageWithActive[]>([]);
  const [value, setValue] = useState('');
  const [selectedList, setSelectedList] = useState<
    AssetImageWithActive[]
  >([]);
  const options = useTypedSelector((store) => store.options);
  const account = useActiveAccount();

  const localOnSubmit = () => {
    onSubmit(selectedList);
  };

  const setActive = (index: number) => {
    const selected = selectedList.some(
      (x) =>
        x.asset_code === list[index].asset_code &&
        x.asset_issuer === list[index].asset_issuer,
    );

    if (selected) {
      const newSelectedList = selectedList.filter(
        (x) => x.asset_issuer !== list[index].asset_issuer,
      );

      setSelectedList(newSelectedList);
    } else {
      setSelectedList([...selectedList, list[index]]);
    }
  };

  const validateForm = async (values: FormValues) => {
    let isDomain = false;

    if (isValidDomain(values.asset)) {
      isDomain = true;
    }

    if (values.asset && value !== values.asset) {
      setValue(values.asset);

      const assets = account.assets || [];

      getAssetsAction(values.asset, isDomain).then((assetList) => {
        const newAssetList = [];

        for (let i = 0; i < assetList.length; i += 1) {
          const isOld = assets.some(
            (asset) =>
              (asset.asset_type === 'credit_alphanum4' ||
                asset.asset_type === 'credit_alphanum12') &&
              asset.asset_code === assetList[i].asset_code &&
              asset.asset_issuer === assetList[i].asset_issuer,
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
    } else if (!values.asset && list.length) {
      setList([]);
      setValue('');
      setSelectedList([]);
    }
  };

  return (
    <Form
      onSubmit={localOnSubmit}
      validate={(values: FormValues) => validateForm(values)}
      render={({ handleSubmit }) => (
        <form
          className="form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Field name="asset">
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
            <>
              <ResultTitle>Search result</ResultTitle>
              <AssetList
                list={list}
                setActive={setActive}
                selectedList={selectedList}
              />

              <ButtonContainer
                btnSize={100}
                positionStyles={{ bottom: '26px' }}
                justify="end"
              >
                <Button
                  variant="default"
                  size="medium"
                  content="Cancel"
                  onClick={onCancel}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="medium"
                  content="Add"
                  disabled={!selectedList.length}
                />
              </ButtonContainer>
            </>
          ) : null}
        </form>
      )}
    />
  );
};

export default SearchAsset;

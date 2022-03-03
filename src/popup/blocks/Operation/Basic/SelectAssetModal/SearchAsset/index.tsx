import React, { useState } from 'react';

import handleAssetImage from 'popup/utils/handleAssetImage';
import Image from 'popup/components/common/Image';
import ScrollBar from 'popup/components/common/ScrollBar';
import questionLogo from '../../../../../../assets/images/question-circle.png';

import * as S from './styles';

type AppProps = {
  currencies: any[];
  closeModal: () => void;
  onChange: (value: any) => void;
};

const SearchAsset = ({
  currencies,
  closeModal,
  onChange,
}: AppProps) => {
  const [searchString, setSearchString] = useState('');

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  const filteredCurrencies = currencies.filter((x) =>
    new RegExp(searchString, 'i').test(x.asset_code),
  );

  const handleClick = (asset) => {
    onChange(asset);
    closeModal();
  };

  return (
    <>
      <S.InputSearch
        type="text"
        value={searchString}
        onChange={(e) => handleChange(e)}
        placeholder="&#xe915;  Search assets"
      />

      <ScrollBar isHidden maxHeight={265}>
        {filteredCurrencies.map((currency, index) => (
          <S.ListItem
            key={index}
            onClick={() => {
              handleClick(currency);
            }}
          >
            <S.Asset>
              <Image
                fallBack={questionLogo}
                alt={currency.asset_code}
                src={handleAssetImage(currency)}
              />
              <div>
                <S.AssetName>
                  {currency.asset_code.toUpperCase()}
                </S.AssetName>
                <S.AssetInfo>{currency.domain}</S.AssetInfo>
              </div>
            </S.Asset>
            <S.AssetPrice>{currency.balance}</S.AssetPrice>
          </S.ListItem>
        ))}
      </ScrollBar>
    </>
  );
};

export default SearchAsset;

import React, { useState } from 'react';

import Image from 'popup/components/common/Image';
import ScrollBar from 'popup/components/common/ScrollBar';
import questionLogo from '../../../../../../assets/images/question-circle.png';
import BN from '../../../../../../helpers/BN';

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
                src={questionLogo}
              />
              <div>
                <S.AssetName>
                  {currency.asset_code &&
                    currency.asset_code.toUpperCase()}
                </S.AssetName>
                <S.AssetInfo>{currency.domain}</S.AssetInfo>
              </div>
            </S.Asset>
            <S.AssetPrice>
              {new BN(currency.balance ?? 0).toString()}
            </S.AssetPrice>
          </S.ListItem>
        ))}

        {!filteredCurrencies.length ? (
          <div className="flex items-center justify-center h-[115px]">
            Asset not found
          </div>
        ) : (
          ''
        )}
      </ScrollBar>
    </>
  );
};

export default SearchAsset;

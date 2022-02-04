import matchAsset from '../matchAsset';
import { TokenType } from '../../staticRes/tokens/types';

const combineTokens = (balances: any[], defaultTokens: TokenType[]): any[] => {
  let newTokens = [...defaultTokens, ...balances];

  for (let i = 0; i < defaultTokens.length; i += 1) {
    const foundToken = balances.find((token) => matchAsset(token, defaultTokens[i]));

    if (foundToken) {
      const foundTokenIndex = newTokens.findIndex((token) => matchAsset(token, defaultTokens[i]));

      newTokens = newTokens.filter((token) => !matchAsset(token, foundToken));

      newTokens = [
        ...newTokens.slice(0, foundTokenIndex),
        foundToken,
        ...newTokens.slice(foundTokenIndex + 1),
      ];
    }
  }

  return newTokens;
};

export default combineTokens;

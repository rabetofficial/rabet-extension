import types from '../actions';

/*
  Asset images:
  [
    {
      asset_code: String,
      asset_issuer: String,
      logo: String,
      domain: String,
    }
  ]
*/

export default (state = [], action) => {
  switch (action.type) {
    case types.assetImages.LOAD: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};

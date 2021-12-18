import types from '../actions';

/*
  Asset images:

  [
    {
      asset_code: String,
      logo: String
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

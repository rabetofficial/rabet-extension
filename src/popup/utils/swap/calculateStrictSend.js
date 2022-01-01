import axios from 'axios';

import isNative from '../isNative';
import currentNetwork from '../horizon/currentNetwork';

const calculateStrictSend = async (values) => {
  const { url: HORIZON_URL } = currentNetwork();

  const params = {
    source_amount: parseFloat(values.from, 10).toFixed(5).toString(),
  };

  if (isNative(values.asset1)) {
    params.source_asset_type = 'native';
  } else {
    params.source_asset_type = values.asset1.asset_type;
    params.source_asset_code = values.asset1.asset_code;
    params.source_asset_issuer = values.asset1.asset_issuer;
  }

  if (isNative(values.asset2)) {
    params.destination_assets = 'native';
  } else {
    params.destination_assets = `${values.asset2.asset_code}:${values.asset2.asset_issuer}`;
  }

  try {
    const result = await axios.get(`${HORIZON_URL}/paths/strict-send`, { params });
    const record = result.data._embedded.records[0];

    if (!record) {
      throw Error('Nothing found');
    }

    return {
      path: record.path,
      destination_amount: record.destination_amount,
    };
  } catch (e) {
    return {
      path: [],
      destination_amount: '0',
    };
  }
};

export default calculateStrictSend;

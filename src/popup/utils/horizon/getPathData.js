import fetch from 'node-fetch';

import querystring from '../querystring';

const getPathData = async ({
  ...params
}) => {
  try {
    const paths = await fetch(`https://horizon.stellar.org/paths/strict-send?${querystring(params)}`)
      .then((res) => res.json());

    const { records } = paths._embedded;

    if (records.length) {
      return records[0];
    }

    return null;
  } catch (e) {
    return null;
  }
};

export default getPathData;

import axois from 'axios';
import fetch from 'node-fetch';

import config from 'Root/config';
import stellar from 'Root/assets/images/stellar.png';

export default async (account) => {
  // const accountDetail = await fetch(`${config.HORIZON_API}/accounts/${account}`)
  //   .then(res => res.json());
  //
  // if (accountDetail.status) {
  //   return stellar;
  // }
  //
  // console.log(accountDetail);
  //
  // const an = await axois({
  //   method: 'get',
  //   url: `http://${accountDetail.home_domain}/.well-known/stellar.toml`,
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //   },
  // });
  //
  //   console.log(an);

  // const assetDetail = await fetch(`http://${accountDetail.home_domain}/.well-known/stellar.toml`, {
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //   },
  //   credentials: 'include',
  //   mode: 'cors',
  //   redirect: 'follow'
  // })

  // console.log(assetDetail);

  // return toml.parse(assetDetail.body).CURRENCIES.find((i) => i.code === token).image;
};

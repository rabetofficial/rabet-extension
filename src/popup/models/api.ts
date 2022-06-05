export type CoinGeckoResult = {
  usd: number;
  eur: number;
  jpy: number;
  gbp: number;
  aud: number;
  cad: number;
  rub: number;
  cny: number;
};

export interface AssetLike {
  asset_code: string;
  asset_issuer: string;
}

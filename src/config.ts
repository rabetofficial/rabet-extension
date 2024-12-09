const config = {
  BASE_FEE: '50000',
  VERSION: '1.7.4',
  MIN_RECEIVED: 99.7,
  SLIDESHOW_TRANSITION: 200,
  INTERVAL_TIME_SECONDS: 13,
  OFFLINE_MODE_TIMEOUT_SECONDS: 4,
  ASSET_SERVER: 'https://asset.rabet.io/assets',
  HORIZON: {
    mainnet: 'https://horizon.stellar.org',
    testnet: 'https://horizon-testnet.stellar.org',
  },
  STEEXP: {
    mainnet: 'https://steexp.com',
    testnet: 'https://testnet.steexp.com',
  },
  STELLAR_EXPERT: {
    mainnet: 'https://stellar.expert/explorer/public',
    testnet: 'https://stellar.expert/explorer/testnet',
  },
  LUMENSCAN: {
    mainnet: 'https://lumenscan.io',
    testnet: 'https://testnet.lumenscan.io',
  },
  WINDOW_WIDTH: 380,
  WINDOW_HEIGHT: 640,
  WINDOW_TIMEOUT_SECONDS: 30,
};

export default config;

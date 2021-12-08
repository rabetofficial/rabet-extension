const config = {
  VERSION: '1.2.0',
  INTERVAL_TIME_SECONDS: 10,
  OFFLINE_MODE_TIMEOUT_SECONDS: 4,
  ASSET_SERVER: 'https://assets.rabet.io',
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

enum RouteName {
  Home = '/',
  Login = '/login',
  Register = '/confirm-login',
  First = '/first',
  Introduction = '/intro',
  IntroSlides = '/intro/slides',
  OfflineMode = '/offline-mode',
  CreateWallet = '/create-wallet',
  RestoreWallet = '/restore-wallet',
  LoggedCreateWallet = '/logged-create-wallet',
  LoggedImportWallet = '/logged-import-wallet',

  Error = '/error',
  Sucess = '/sucess',
  PrivateKey = '/private-key',
  ShowPrivateKey = '/show-private-key',

  Send = '/send',
  Confirm = '/confirm',
  BasicOperation = '/basic-operation',
  AdvancedOperation = '/advance-operation',
  BasicSendConfirm = '/basic-operation/send/confirm',
  BasicSwapConfirm = '/basic-operation/swap/confirm',
  SendExtension = '/send-extension',
  SwapExtension = '/swap-extension',
  ClaimableBalances = '/claimable-balances',

  Flags = '/flag',
  AssetInfo = '/asset',
  DeleteAccount = '/delete-account',
  ConnectedWebsites = '/connected-website',
  XLMAsset = '/xlm-asset',
  Setting = '/setting',
  AddAsset = '/add-asset',
  QRCode = '/qr-code',
  ConfirmFlag = '/confirm-flag',
  AddContact = '/add-contact',
  EditContact = '/edit-contact',

  FetchData = '/fetch-data',
  BackupFile = '/backup-file',
  ContactRequest = '/contact-request',

  LoadingOne = '/loading-one',
  LoadingOverlay = '/loading-overlay',
  LoadingNetwork = '/loading-network',

  AccountManager = '/account-manager',
}

export default RouteName;

export const homePage = '/';
export const loginPage = '/login';
export const confirmLoginPage = '/confirm-login';
export const firstPage = '/first';
export const introduction = '/intro';
export const successSubmitPage = '/success';
export const errorPage = '/error';
export const privateKeyPage = '/private-key';
export const QRCodePage = '/qr-code';
export const createWalletPage = '/create-wallet';
export const restoreWalletPage = '/restore-wallet';
export const SendPage = '/send';
export const ConfirmPage = '/confirm';
export const ShowPrivateKeyPage = '/show-private-key';
export const flagPage = '/flag';
export const confirmFlagPage = '/confirm-flag';
export const addAssetPage = '/add-asset';
export const settingPage = '/setting';
export const contactPage = '/contact-request';
export const fetchDataPage = '/fetch-data';
export const assetsPage = '/asset';
export const xlmAssetPage = '/xlm-asset';
export const loadingOnePage = '/loading-one';
export const loadingOverlayPage = '/loading-overlay';
export const accountManagerPage = '/account-manager';
export const loadingNetworkPage = '/loading-network';
export const deleteAccountPage = '/delete-account';
export const connectedWebsitePage = '/connected-website';
export const offlineModePage = '/offline-mode';
export const backupFile = '/backup-file';
export const basicOperationPage = '/basic-operation';
export const basicSwapConfirmPage = '/basic-operation/swap/confirm';
export const basicSendConfirmPage = '/basic-operation/send/confirm';
export const advanceOperationPage = '/advance-operation';
export const claimableBalances = '/claimableBalances';

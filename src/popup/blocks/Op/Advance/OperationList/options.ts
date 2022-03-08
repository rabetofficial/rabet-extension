import * as operations from 'popup/staticRes/operations';

const options = [
  { value: operations.payment, label: 'Payment' },
  {
    value: operations.pathPaymentStrictSend,
    label: 'Path payment strict send',
  },
  {
    value: operations.pathPaymentStrictReceive,
    label: 'Path payment strict receive',
  },
  { value: operations.manageBuyOffer, label: 'Manage offer' },
  {
    value: operations.createPassiveSellOffer,
    label: 'Manage passive offer',
  },
  {
    value: operations.setOptionsInflationDest,
    label: 'Set options (inflation)',
  },
  {
    value: operations.setOptionsClearFlags,
    label: 'Set options (Clear flag)',
  },
  {
    value: operations.setOptionsSetFlags,
    label: 'Set options (Set flag)',
  },
  {
    value: operations.setOptionsMasterWeight,
    label: 'Set options (Master weight)',
  },
  {
    value: operations.setOptionsHomeDomain,
    label: 'Set options (Home domain)',
  },
  {
    value: operations.setOptionsSigner,
    label: 'Set options (Signer)',
  },
  {
    value: operations.setOptionsThreshold,
    label: 'Set options (Threshold)',
  },
  { value: operations.changeTrust, label: 'Change trust' },
  { value: operations.allowTrust, label: 'Allow trust' },
  { value: operations.accountMerge, label: 'Account merge' },
  { value: operations.manageData, label: 'Manage data' },
  { value: operations.bumpSequence, label: 'Bump sequence' },
];

export default options;

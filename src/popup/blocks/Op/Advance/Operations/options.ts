import { Horizon } from '@stellar/stellar-sdk';

const operation = Horizon.HorizonApi.OperationResponseType;

type OptionType = {
  value: Horizon.HorizonApi.OperationResponseType | string;
  label: string;
};

const options: OptionType[] = [
  { value: operation.payment, label: 'Payment' },
  {
    value: operation.pathPaymentStrictSend,
    label: 'Path payment strict send',
  },
  {
    value: operation.pathPayment,
    label: 'Path payment strict receive',
  },
  {
    value: operation.createClaimableBalance,
    label: 'Create claimable balance',
  },
  {
    value: operation.manageBuyOffer,
    label: 'Manage offer',
  },
  {
    value: operation.createPassiveOffer,
    label: 'Manage passive offer',
  },
  {
    value: `${operation.setOptions}_inflation`,
    label: 'Set options (inflation)',
  },
  {
    value: `${operation.setOptions}_clear_flag`,
    label: 'Set options (Clear flag)',
  },
  {
    value: `${operation.setOptions}_set_flag`,
    label: 'Set options (Set flag)',
  },
  {
    value: `${operation.setOptions}_master_weight`,
    label: 'Set options (Master weight)',
  },
  {
    value: `${operation.setOptions}_home_domain`,
    label: 'Set options (Home domain)',
  },
  {
    value: `${operation.setOptions}_signer`,
    label: 'Set options (Signer)',
  },
  {
    value: `${operation.setOptions}_threshold`,
    label: 'Set options (Threshold)',
  },
  {
    value: operation.changeTrust,
    label: 'Change trust',
  },
  {
    value: operation.allowTrust,
    label: 'Allow trust',
  },
  {
    value: operation.accountMerge,
    label: 'Account merge',
  },
  {
    value: operation.manageData,
    label: 'Manage data',
  },
  {
    value: operation.bumpSequence,
    label: 'Bump sequence',
  },
];

export default options;

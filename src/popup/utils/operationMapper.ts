import { Horizon } from 'stellar-sdk';

import formatBalance from './formatBalance';

const operations = Horizon.OperationResponseType;

type OpMapped = {
  title: string;
  info: {
    title: string;
    value: string;
  }[];
};

export default (operation: any): OpMapped => {
  // PAYMENT
  // CREATE ACCOUNT
  if (operation.type === operations.payment) {
    const mapper = {
      title: operation.isAccountNew ? 'Create Account' : 'Payment',
      info: [
        {
          title: 'Destination',
          value: operation.destination,
        },
        {
          title: 'Amount',
          value: `${formatBalance(operation.amount)} ${
            operation.asset.asset_code || 'XLM'
          }`,
        },
      ],
    };

    return mapper;
  }

  // BUMP SEQUENCE
  if (operation.type === operations.bumpSequence) {
    const mapper = {
      title: 'Bump Sequence',
      info: [
        {
          title: 'BumpTo',
          value: formatBalance(operation.bumpTo),
        },
      ],
    };

    return mapper;
  }

  // MANAGE DATA
  if (operation.type === operations.manageData) {
    const mapper = {
      title: 'Manage Data',
      info: [
        {
          title: 'Name',
          value: operation.name,
        },
        {
          title: 'Value',
          value: operation.value,
        },
      ],
    };

    return mapper;
  }

  // ACCOUNT MERGE
  if (operation.type === operations.accountMerge) {
    const mapper = {
      title: 'Account Merge',
      info: [
        {
          title: 'Destination',
          value: operation.destination,
        },
      ],
    };

    return mapper;
  }

  // ALLOW TRUST
  if (operation.type === operations.allowTrust) {
    const mapper = {
      title: 'Allow Trust',
      info: [
        {
          title: 'Trustor',
          value: operation.trustor,
        },
        {
          title: 'Asset Code',
          value: operation.assetCode,
        },
        {
          title: 'Authorize',
          value: operation.authorize,
        },
      ],
    };

    return mapper;
  }

  // CHANGE TRUST
  if (operation.type === operations.changeTrust) {
    const mapper = {
      title: 'Change Trust',
      info: [
        {
          title: 'Asset',
          value: `${operation.asset.asset_code || 'XLM'}`,
        },
        {
          title: 'Limit',
          value: formatBalance(operation.limit),
        },
      ],
    };

    return mapper;
  }

  // Set Options (Threshold)
  if (operation.type === `${operations.setOptions}_threshold`) {
    const mapper = {
      title: 'Set Options (Threshold)',
      info: [
        {
          title: 'Low',
          value: operation.low,
        },
        {
          title: 'Medium',
          value: operation.medium,
        },
        {
          title: 'High',
          value: operation.high,
        },
      ],
    };

    return mapper;
  }

  // Set Options (Signer)
  if (operation.type === `${operations.setOptions}_signer`) {
    const mapper = {
      title: 'Set Options (Signer)',
      info: [
        {
          title: 'Signer',
          value: operation.signer,
        },
        {
          title: 'Weight',
          value: formatBalance(operation.weight),
        },
      ],
    };

    return mapper;
  }

  // Set Options (Home Domain)
  if (operation.type === `${operations.setOptions}_home_domain`) {
    const mapper = {
      title: 'Set Options (Home Domain)',
      info: [
        {
          title: 'Home Domain',
          value: operation.homeDomain,
        },
      ],
    };

    return mapper;
  }

  // Set Options (Master Weight)
  if (operation.type === `${operations.setOptions}_master_weight`) {
    const mapper = {
      title: 'Set Options (Master Weight)',
      info: [
        {
          title: 'Master Weight',
          value: operation.masterWeight,
        },
      ],
    };

    return mapper;
  }

  // Set Options (Set Flag)
  if (operation.type === `${operations.setOptions}_set_flag`) {
    const mapper = {
      title: 'Set Options (Set Flag)',
      info: [
        {
          title: 'Set Flags',
          value: operation.setFlags,
        },
      ],
    };

    return mapper;
  }

  // Set Options (Clear Flag)
  if (operation.type === `${operations.setOptions}_clear_flag`) {
    const mapper = {
      title: 'Set Options (Clear Flag)',
      info: [
        {
          title: 'Clear Flags',
          value: operation.clearFlags,
        },
      ],
    };

    return mapper;
  }

  // Set Options (Inflation)
  if (operation.type === `${operations.setOptions}_inflation`) {
    const mapper = {
      title: 'Set Options (Inflation)',
      info: [
        {
          title: 'Destination',
          value: operation.destination,
        },
      ],
    };

    return mapper;
  }

  // Path Payment Strict Send
  if (operation.type === operations.pathPaymentStrictSend) {
    const mapper = {
      title: 'Path Payment Strict Send',
      info: [
        {
          title: 'Destination',
          value: operation.destination,
        },
        {
          title: 'Send Amount',
          value: `${formatBalance(operation.sendAmount)} ${
            operation.sendAsset.asset_code || 'XLM'
          }`,
        },
        {
          title: 'Destination Min',
          value: `${formatBalance(operation.destMin)} ${
            operation.destAsset.asset_code || 'XLM'
          }`,
        },
      ],
    };

    return mapper;
  }

  // Path Payment Strict Receive
  if (operation.type === operations.pathPayment) {
    const mapper = {
      title: 'Path Payment Strict Receive',
      info: [
        {
          title: 'Destination',
          value: operation.destination,
        },
        {
          title: 'Send Max',
          value: `${formatBalance(operation.sendMax)} ${
            operation.sendAsset.asset_code || 'XLM'
          }`,
        },
        {
          title: 'Destination Min',
          value: `${formatBalance(operation.destAmount)} ${
            operation.destAsset.asset_code || 'XLM'
          }`,
        },
      ],
    };

    return mapper;
  }

  // MANAGE BUY OFFER
  if (operation.type === operations.manageBuyOffer) {
    const mapper = {
      title: 'Manage Offer',
      info: [
        {
          title: 'Selling',
          value: `${formatBalance(operation.selling)} ${
            operation.sellingAsset.asset_code || 'XLM'
          }`,
        },
        {
          title: 'Buying',
          value: `${formatBalance(operation.buying)} ${
            operation.buyingAsset.asset_code || 'XLM'
          }`,
        },
        {
          title: 'Offer ID',
          value: formatBalance(operation.offerId),
        },
      ],
    };

    return mapper;
  }

  // CREATE PASSIVE SELL OFFER
  if (operation.type === operations.createPassiveOffer) {
    const mapper = {
      title: 'Manage Passive Offer',
      info: [
        {
          title: 'Selling',
          value: `${formatBalance(operation.selling)} ${
            operation.sellingAsset.asset_code || 'XLM'
          }`,
        },
        {
          title: 'Buying',
          value: `${formatBalance(operation.buying)} ${
            operation.buyingAsset.asset_code || 'XLM'
          }`,
        },
      ],
    };

    return mapper;
  }

  return {
    title: operation.type,
    info: [
      {
        title: '',
        value: '',
      },
    ],
  };
};

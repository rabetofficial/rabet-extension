import * as operations from 'Root/staticRes/operations';

import removeTrailingZeroes from './removeTrailingZeroes';

const returnAsset = (asset) => {
  if (asset.type === 'native') {
    return 'XLM';
  }

  return asset.assetCode;
};

export default (operation) => {
  // PAYMENT
  if (operation.type === operations.payment) {
    const mapper = {
      title: 'Payment',
      info: [
        {
          title: 'Destination',
          value: operation.destination,
        },
        {
          title: 'Amount',
          value: `${removeTrailingZeroes(operation.amount)} ${returnAsset(operation.asset)}`,
        },
      ],
    };

    return mapper;
  }

  // CREATE ACCOUNT
  if (operation.type === operations.createAccount) {
    const mapper = {
      title: 'Create Account',
      info: [
        {
          title: 'Destination',
          value: operation.destination,
        },
        {
          title: 'StartingBalance',
          value: `${removeTrailingZeroes(operation.startingBalance)}`,
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
          value: removeTrailingZeroes(operation.bumpTo),
        },
      ],
    };

    return mapper;
  }

  // MANAGE DATA
  if (operation.type === operations.manageData || operation.type === operations.manageDatum) {
    const mapper = {
      title: 'Manage Data',
    };

    const info = [
      {
        title: 'Name',
        value: operation.name
      },
    ];

    if (operation.value) {
      info.push({
        title: 'Value',
        value: operation.value,
      });
    }

    mapper.info = info;

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
          value: returnAsset(operation.asset),
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
          value: `${returnAsset(operation.asset)}`,
        },
        {
          title: 'Limit',
          value: removeTrailingZeroes(operation.limit),
        },
      ],
    }

    return mapper;
  }

  if (operation.type === operations.setOption || operation.type === operations.setOptions) {
    const mapper = {
      title: 'Set Options',
    };

    const info = [];

    if (operation.lowThreshold) {
      info.push({
        title: 'Low threshold',
        value: operation.lowThreshold,
      });
    }

    if (operation.medThreshold) {
      info.push({
        title: 'Medium threshold',
        value: operation.medThreshold,
      });
    }

    if (operation.highThreshold) {
      info.push({
        title: 'High threshold',
        value: operation.highThreshold,
      });
    }

    if (operation.signer) {
      info.push({
        title: 'Signer',
        value: `${operation.signer.key} ${operation.signer.weight}`,
      });
    }

    if (operation.homeDomain) {
      info.push({
        title: 'Home Domain',
        value: operation.homeDomain,
      });
    }

    if (operation.masterWeight) {
      info.push({
        title: 'Master Weight',
        value: operation.masterWeight,
      });
    }

    if (operation.setFlags) {
      info.push({
        title: 'Set flags',
        value: operation.setFlags,
      });
    }

    if (operation.clearFlags) {
      info.push({
        title: 'Clear flags',
        value: operation.clearFlags,
      });
    }

    if (operation.inflationDest) {
      info.push({
        title: 'Inflation Destination',
        value: operation.inflationDest,
      });
    }

    mapper.info = info;

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
          value: `${removeTrailingZeroes(operation.sendAmount)} ${returnAsset(operation.sendAsset)}`,
        },
        {
          title: 'Destination Min',
          value: `${removeTrailingZeroes(operation.destMin)} ${returnAsset(operation.destAsset)}`,
        },
      ],
    }

    return mapper;
  }

  // Path Payment Strict Receive
  if (operation.type === operations.pathPaymentStrictReceive) {
    const mapper = {
      title: 'Path Payment Strict Receive',
      info: [
        {
          title: 'Destination',
          value: operation.destination,
        },
        {
          title: 'Send Max',
          value: `${removeTrailingZeroes(operation.sendMax)} ${returnAsset(operation.sendAsset)}`,
        },
        {
          title: 'Destination Min',
          value: `${removeTrailingZeroes(operation.destAmount)} ${returnAsset(operation.destAsset)}`,
        },
      ],
    }

    return mapper;
  }

  // MANAGE BUY OFFER
  if (operation.type === operations.manageBuyOffer) {
    const mapper = {
      title: 'Manage Buy Offer',
      info: [
        {
          title: 'Buying',
          value: `${removeTrailingZeroes(operation.buyAmount)} ${returnAsset(operation.buying)}`,
        },
        {
          title: 'Selling',
          value: `${returnAsset(operation.selling)}`,
        },
        {
          title: 'Offer ID',
          value: removeTrailingZeroes(operation.offerId),
        },
      ],
    }

    return mapper;
  }

  // MANAGE SELL OFFER
  if (operation.type === operations.manageSellOffer) {
    const mapper = {
      title: 'Manage Sell Offer',
      info: [
        {
          title: 'Selling',
          value: `${removeTrailingZeroes(operation.amount)} ${returnAsset(operation.selling)}`,
        },
        {
          title: 'Buying',
          value: `${returnAsset(operation.buying)}`,
        },
        {
          title: 'Offer ID',
          value: removeTrailingZeroes(operation.offerId),
        },
      ],
    }

    return mapper;
  }

    // CREATE PASSIVE SELL OFFER
    if (operation.type === operations.createPassiveSellOffer) {
      const mapper = {
        title: 'Manage Passive Offer',
        info: [
          {
            title: 'Selling',
            value: `${removeTrailingZeroes(operation.amount)} ${returnAsset(operation.selling)}`,
          },
          {
            title: 'Buying',
            value: `${returnAsset(operation.buying)}`,
          },
        ],
      }

      return mapper;
    }

    const mapper = {
      title: operation.type,
    };

    return mapper;
};

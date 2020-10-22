import * as operations from 'Root/staticRes/operations';

export default (operation) => {
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
          value: `${operation.amount} ${operation.asset}`,
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
          value: operation.bumpTo,
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
          value: operation.name
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
          title: 'Limit',
          value: operation.limit,
        },
        {
          title: 'Asset',
          value: operation.code,
        },
        {
          title: 'Issuer',
          value: operation.issuer,
        },
      ],
    }

    return mapper;
  }

  // Set Options (Threshold)
  if (operation.type === operations.setOptionsThreshold) {
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
    }

    return mapper;
  }

  // Set Options (Signer)
  if (operation.type === operations.setOptionsSigner) {
    const mapper = {
      title: 'Set Options (Signer)',
      info: [
        {
          title: 'Signer',
          value: operation.signer,
        },
        {
          title: 'Weight',
          value: operation.weight,
        },
      ],
    }

    return mapper;
  }

  // Set Options (Home Domain)
  if (operation.type === operations.setOptionsHomeDomain) {
    const mapper = {
      title: 'Set Options (Home Domain)',
      info: [
        {
          title: 'Home Domain',
          value: operation.homeDomain,
        },
      ],
    }

    return mapper;
  }

  // Set Options (Master Weight)
  if (operation.type === operations.setOptionsMasterWeight) {
    const mapper = {
      title: 'Set Options (Master Weight)',
      info: [
        {
          title: 'Master Weight',
          value: operation.masterWeight,
        },
      ],
    }

    return mapper;
  }

  // Set Options (Set Flag)
  if (operation.type === operations.setOptionsSetFlags) {
    const mapper = {
      title: 'Set Options (Set Flag)',
      info: [
        {
          title: 'Set Flags',
          value: operation.setFlags,
        },
      ],
    }

    return mapper;
  }

  // Set Options (Clear Flag)
  if (operation.type === operations.setOptionsClearFlags) {
    const mapper = {
      title: 'Set Options (Clear Flag)',
      info: [
        {
          title: 'Clear Flags',
          value: operation.clearFlags,
        },
      ],
    }

    return mapper;
  }

  // Set Options (Inflation)
  if (operation.type === operations.setOptionsInflationDest) {
    const mapper = {
      title: 'Set Options (Inflation)',
      info: [
        {
          title: 'Destination',
          value: operation.destination,
        },
      ],
    }

    return mapper;
  }

  // Path Payment Strict Send
  if (operation.type === operations.pathPaymentStrictSend) {
    const mapper = {
      title: 'Path Payment Strict Send',
      info: [
        {
          title: 'Send Amount',
          value: `${operation.sendAmount} ${operation.sendAsset.value}`,
        },
        {
          title: 'Destination Min',
          value: `${operation.destMin} ${operation.destAsset.value}`,
        },
        {
          title: 'Destination',
          value: operation.destination,
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
          title: 'Send Max',
          value: `${operation.sendMax} ${operation.sendAsset.value}`,
        },
        {
          title: 'Destination Min',
          value: `${operation.destAmount} ${operation.destAsset.value}`,
        },
        {
          title: 'Destination',
          value: operation.destination,
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
          value: `${operation.buying} ${operation.buyingAsset.value}`,
        },
        {
          title: 'Selling',
          value: `${operation.selling} ${operation.sellingAsset.value}`,
        },
        {
          title: 'Offer ID',
          value: operation.offerId,
        },
      ],
    }

    return mapper;
  }

    // CREATE PASSIVE SELL OFFER
    if (operation.type === operations.createPassiveSellOffer) {
      const mapper = {
        title: 'Create Passive Sell Offer',
        info: [
          {
            title: 'Buying',
            value: `${operation.buying} ${operation.buyingAsset.value}`,
          },
          {
            title: 'Selling',
            value: `${operation.selling} ${operation.sellingAsset.value}`,
          },
          {
            title: 'Offer ID',
            value: operation.offerId,
          },
        ],
      }
  
      return mapper;
    }
};

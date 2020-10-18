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
};

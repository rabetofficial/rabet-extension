import formatCurrency from './formatCurrency';

function manageOffer(data, opType) {
  console.log(data, opType);
  if (parseFloat(data.amount) === 0) {
    return `Delete offer`;
  }

  if (data.offer_id === '0') {
    return `Create offer [ buying ${formatCurrency(data.amount)} ${data.buying_asset_code || 'XLM'} selling ${data.price_r.n}]`;
  }

  return `Update offer [ buying ${formatCurrency(data.amount)}]`;
}

function updatePassive(data, opType) {
  if (parseFloat(data.amount) === 0) {
    return `Delete Passive offer`;
  }

  if (data.offer_id === '0') {
    return `Create Passive offer`;
  }

  return `Update Passive offer`;
}

export default function OperationDetails(data) {
  switch (data.type) {
    case 'create_account': {
      return `Create account ${data.account} with ${formatCurrency(data.starting_balance)} XLM`;
    }

    case 'payment': {
      return `Payment ${formatCurrency(data.amount)} ${data.asset_code ? data.asset_code : 'XLM'} from ${data.from} to ${data.to}`;
    }

    case 'path_payment_strict_send': {
      return `Path payment to ${data.to} with source ${data.source}`;
    }

    case 'path_payment_strict_receive': {
      return `Path payment to ${data.to} with source ${data.source}`;
    }

    case 'manage_sell_offer': {
      return manageOffer(data, 'sell');
    }

    case 'manage_buy_offer': {
      return manageOffer(data, 'buy');
    }

    case 'manage_offer': {
      return manageOffer(data);
    }

    case 'create_passive_sell_offer': {
      return updatePassive(data, 'sell');
    }

    case 'create_passive_buy_offer': {
      return updatePassive(data, 'buy');
    }

    case 'create_passive_offer': {
      return updatePassive(data);
    }

    case 'set_options': {
      if (data.low_threshold || data.med_threshold || data.high_threshold) {
        const options = [];

        if (data.low_threshold) {
          options.push(`Low: ${data.low_threshold}`);
        }

        if (data.med_threshold) {
          options.push(`Medium: ${data.med_threshold}`);
        }

        if (data.high_threshold) {
          options.push(`High: ${data.high_threshold}`);
        }

        return `Set options threshold [ ${options.join(', ')} ]`;
      }

      if (data.master_key_weight) {
        return `Set options master key [ weight: ${data.master_key_weight} ]`;
      }

      if (data.inflation_dest) {
        return `Set options inflation [ destination: ${data.inflation_dest} ]`;
      }

      if (data.signer_key) {
        return `Set options signer [ key: ${data.signer_key}, weight: ${data.signer_weight}]`;
      }

      if (data.set_flags) {
        return `Set options add flags [${data.set_flags_s.join(', ')}]`;
      }

      if (data.clear_flags) {
        return `Set options clear flags [${data.clear_flags_s.join(', ')}]`;
      }

      if (data.home_domain) {
        return `Set options home domain [ ${data.home_domain} ]`;
      }

      return 'Set options []';
    }

    case 'change_trust': {
      return `Trust ${data.asset_code ? data.asset_code : 'XLM'} by ${data.trustor} with limit ${data.limit}`;
    }

    case 'allow_trust': {
      return `Allow trust [ asset: ${data.asset_code ? data.asset_code : 'XLM'}, authorize: ${data.authorize ? 'true' : 'false'}, trustor: ${data.trustor} ]`;
    }

    case 'account_merge': {
      return `Merge account ${data.account} into ${data.into}`;
    }

    case 'manage_data': {
      return `Manage data [ name: ${data.name}, value: ${data.value} ]`;
    }

    case 'bump_sequence': {
      return `Bump sequence to ${data.bump_to}`;
    }

    default: {
      return '-';
    }
  }
}

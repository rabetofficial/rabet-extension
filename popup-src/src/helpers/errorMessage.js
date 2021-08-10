const transactionResultCodes = {
    'tx_failed': 'One of the operations failed (none were applied).',
    'tx_too_early': 'The ledger closeTime was before the minTime.',
    'tx_too_late': 'The ledger closeTime was after the maxTime.',
    'tx_missing_operation': 'No operation was specified.',
    'tx_bad_seq': 'Sequence number does not match source account.',
    'tx_bad_auth': 'Too few valid signatures / wrong network.',
    'tx_insufficient_balance': 'Fee would bring account below reserve.',
    'tx_no_source_account': 'Source account not found.',
    'tx_insufficient_fee': 'Fee is too small.',
    'tx_bad_auth_extra': 'Unused signatures attached to transaction.',
    'tx_internal_error': 'An unknown error occured.',
};

const operationResultCodes = {
    // Operation Result Codes
    'op_inner': 'The inner object result is valid and the operation was a success.',
    'op_bad_auth': 'There are too few valid signatures, or the transaction was submitted to the wrong network.',
    'op_no_source_account': 'The source account was not found.',
    'op_not_supported': 'The operation is not supported at this time.',
    'op_too_many_subentries': 'Max number of subentries already reached.',
    'op_exceeded_work_limit': 'Operation did too much work.',

    // Create Account Result Codes
    'op_malformed': 'The input/destination was invalid.',
    'op_underfunded': 'The source account performing the command does not have enough funds to give the destination account the necessary mininum reserve and still maintain its own minimum reserve.',
    'op_low_reverse': 'The operation would create an account below the minimum reserve.',
    'op_already_exists': 'The destination account already exists.',

    // Payment Result Codes
    'op_src_no_trust': 'The source account is missing the appropriate trustline.',
    'op_src_not_authorized': 'The source account is not authorized to send this asset.',
    'op_no_destination': 'The destination account does not exist.',
    'op_no_trust': 'The destination account does not have a trustline for the asset being sent.',
    'op_not_authorized': 'The destination account is not authorized to hold this asset.',
    'op_line_full': 'The destination account (receiver) does not have sufficient limits to receive amount and still satisfy its buying liabilities.',
    'op_no_issuer': 'The issuer of the asset does not exist.',

    // Path Payment Strict Receive Result Codes
    'op_too_few_offers': 'There is no path of offers connecting the send asset and destination asset. Stellar only considers paths of length 5 or shorter.',
    'op_cross_self': 'This path payment would cross one of its own offers.',
    'op_over_source_max': 'The paths that could send destination amount of destination asset would exceed send max.',

    // Path Payment Strict Send Result Codes
    'op_under_dest_min': 'The paths that could send destination amount of destination asset would fall short of destination min.',

    // Manage Sell Offer Result Codes
    // Create Passive Sell Offer Result Codes
    'op_sell_no_trust': 'The account creating the offer does not have a trustline for the asset it is selling.',
    'op_buy_no_trust': 'The account creating the offer does not have a trustline for the asset it is buying.',
    'sell_not_authorized': 'The account creating the offer is not authorized to sell this asset.',
    'buy_not_authorized': 'The account creating the offer is not authorized to buy this asset.',
    'op_sell_not_authorized': 'The account creating the offer is not authorized to sell this asset.',
    'op_buy_not_authorized': 'The account creating the offer is not authorized to buy this asset.',
    'op_sell_no_issuer': 'The issuer of selling asset does not exist.',
    'buy_no_issuer': 'The issuer of buying asset does not exist.',
    'op_buy_no_issuer': 'The issuer of buying asset does not exist.',

    // Manage Buy Offer Result Codes
    'op_offer_not_found': 'An offer with that offerID cannot be found.',

    // Set Options Result Codes
    'op_too_many_signers': '20 is the maximum number of signers an account can have, and adding another signer would exceed that.',
    'op_bad_flags': 'The flags set and/or cleared are invalid by themselves or in combination.',
    'op_invalid_inflation': 'The destination account set in the inflation field does not exist.',
    'op_cant_change': 'This account can no longer change the option it wants to change.',
    'op_unknown_flag': 'The account is trying to set a flag that is unknown.',
    'op_threshold_out_of_range': 'The value for a key weight or threshold is invalid.',
    'op_bad_signer': 'Any additional signers added to the account cannot be the master key.',
    'op_invalid_home_domain': 'Home domain is malformed.',

    // Change Trust Result Codes
    'op_invalid_limit': 'The limit is not sufficient to hold the current balance of the trustline and still satisfy its buying liabilities.',
    'op_self_not_allowed': 'The source account attempted to create a trustline for itself, which is not allowed.',

    // Allow Trust Result Codes
    'op_no_trustline': 'The trustor does not have a trustline with the issuer performing this operation.',
    'op_not_required': 'The source account (issuer performing this operation) does not require trust. In other words, it does not have to have the flag AUTH_REQUIRED_FLAG set.',
    'op_cant_revoke': 'The source account is trying to revoke the trustline of the trustor, but it cannot do so.',
    
    // Account Merge Result Codes
    'op_no_account': 'The destination account does not exist.',
    'op_immutable_set': 'The source account has AUTH_IMMUTABLE flag set.',
    'op_has_sub_entries': 'The source account has trustlines and/or offers.',
    'op_seq_num_too_far': 'Source account sequence number is too high',
    'op_dest_full': 'The destination account cannot receive the balance of the source account and still satisfy its lumen buying liabilities',

    // Manage Data Result Codes
    'op_not_supported_yet': 'The network hasn’t moved to this protocol change yet. This failure means the network doesn’t support this feature yet.',
    'op_data_name_not_found': 'Trying to remove a Data Entry that isn’t there. This will happen if Name is set (and Value isn’t) but the Account doesn’t have a DataEntry with that Name.',
    'op_data_invalid_name': 'Name not a valid string.',

    // Bump Sequence Result Codes
};

function showError(data) {
    const { status } = data;
    const { result_codes } = data.extras;

    if (result_codes.transaction && (!result_codes.operations || !result_codes.operations.length)) {
        return `${transactionResultCodes[result_codes.transaction]}`;
    }

    return `${operationResultCodes[result_codes.operations[0]]}`;
}

export default showError;
import { DateTime } from 'luxon';
import getClaimableBalances, {
  ClaimableBalanceDetailed,
} from 'popup/api/getClaimableBalances';
import xlmLogo from 'assets/images/xlm-logo.svg';
import {
  getPredicateInformation,
  predicateFromHorizonResponse,
} from 'popup/utils/stellarResolveClaimantPredicates';

const loadClaimableBalances = async (publicKey: string) => {
  const cbs = await getClaimableBalances(publicKey);

  const cbsDetailed: ClaimableBalanceDetailed[] = cbs.map((cb) => {
    const [assetCode, assetIssuer] = cb.asset.split(':');
    let showAssetCode = assetCode;
    let showAssetLogo = cb.logo;

    if (assetCode === 'native' && !assetIssuer) {
      showAssetCode = 'XLM';
      showAssetLogo = xlmLogo;
    }

    const foundClaimant = cb.claimants.find(
      (claimant) => claimant.destination === publicKey,
    );

    const cbData = {
      ...cb,
      showAssetCode,
      showAssetLogo,
    };

    if (foundClaimant) {
      return {
        ...cbData,
        status: getPredicateInformation(
          predicateFromHorizonResponse(foundClaimant.predicate),
          new Date(),
        ),
      };
    }

    return {
      ...cbData,
      status: {
        status: 'upcoming',
        validFrom: 1685976895967,
        validTo: 1685986895967,
      },
    };
  });

  const cbsFiltered = cbsDetailed.filter((cb) => {
    if (cb.status.validFrom) {
      const now = DateTime.now();
      const then = DateTime.fromSeconds(cb.status.validFrom);

      const diff = then.diff(now, ['days', 'hours', 'minutes']);

      if (diff.days > 10_000_000) {
        return false;
      }

      return true;
    }

    return true;
  });

  return cbsFiltered;
};

export default loadClaimableBalances;

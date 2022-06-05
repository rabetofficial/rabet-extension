import { Server, ServerApi } from 'stellar-sdk';

import currentNetwork from 'popup/utils/currentNetwork';
import ClaimableBalance from 'popup/blocks/Op/Advance/Operations/List/claimable‌‌‌Balance';
import getAssetImages from './getAssetImages';

export interface ClaimableBalanceWithAssetImage
  extends ServerApi.ClaimableBalanceRecord {
  logo: string;
}

const getClaimableBalances = async (publicKey: string) => {
  const serverURL = currentNetwork().url;

  const server = new Server(serverURL);

  try {
    const sponsorCBs = server
      .claimableBalances()
      .sponsor(publicKey)
      .order('desc')
      .limit(200)
      .call();

    const claimantCBs = server
      .claimableBalances()
      .claimant(publicKey)
      .order('desc')
      .limit(200)
      .call();

    const [sponsorResult, claimantResult] = await Promise.all([
      sponsorCBs,
      claimantCBs,
    ]);

    const totalCBs = [
      ...sponsorResult.records,
      ...claimantResult.records,
    ];

    totalCBs.sort(
      (a, b) => b.last_modified_ledger - a.last_modified_ledger,
    );

    const claimableAssets = totalCBs.map((cb) => ({
      asset_code: cb.asset.split(':')[0],
      asset_issuer: cb.asset.split(':')[1],
    }));

    const assetImages = await getAssetImages(claimableAssets);

    const claimableBalanceWithAssetLogo: ClaimableBalanceWithAssetImage[] =
      totalCBs.map((cb) => {
        const asset = cb.asset.split(':');

        const foundAsset = assetImages.find(
          (ast) =>
            ast.asset_code === asset[0] &&
            ast.asset_issuer === asset[1],
        );

        let logo = '';

        if (foundAsset) {
          logo = foundAsset.logo;
        }

        return {
          ...cb,
          logo,
        };
      });
    return claimableBalanceWithAssetLogo;
  } catch (e) {
    return [];
  }
};

export default getClaimableBalances;

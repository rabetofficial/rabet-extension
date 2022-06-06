import React, { useEffect, useState } from 'react';

import Header from 'popup/components/common/Header';
import ScrollBar from 'popup/components/common/ScrollBar';
import ExtTitle from 'popup/components/common/Title/Ext';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import SelectOption from 'popup/components/common/SelectOption';
import ClaimableBalancesComponent from 'popup/blocks/ClaimableBalances';
import loadClaimableBalances from 'popup/features/loadClaimableBalances';
import Loading from 'popup/components/Loading';
import { ElementOption } from 'popup/models';
import { ClaimableBalanceWithAssetImage } from 'popup/api/getClaimableBalances';

const ClaimableBalances = () => {
  const activeAccount = useActiveAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [cbs, setCbs] = useState<ClaimableBalanceWithAssetImage[]>(
    [],
  );

  const [selected, setSelected] = useState<ElementOption<string>>({
    value: 'all',
    label: 'All',
  });

  useEffect(() => {
    loadClaimableBalances(activeAccount.publicKey).then(
      (cbsResponse) => {
        setIsLoading(false);
        setCbs(cbsResponse);
      },
    );
  }, []);

  if (isLoading) {
    return (
      <ScrollBar isHidden>
        <div className="flex justify-center items-center h-[600px]">
          <Loading size={60} />
        </div>
      </ScrollBar>
    );
  }

  const selectOnChange = (e: ElementOption<string>) => {
    setSelected(e);
  };

  const selectOptions = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'expired', label: 'Expired' },
    { value: 'claimable', label: 'Claimable' },
  ];

  return (
    <>
      <Header />

      <ScrollBar isHidden maxHeight={540}>
        <div style={{ maxWidth: '360px' }}>
          <div className="content">
            <ExtTitle title="Claimable balance" className="mt-4" />
            <div className="mt-5">
              <SelectOption
                defaultValue={selectOptions[0]}
                selected={selected}
                variant="outlined"
                items={selectOptions}
                onChange={selectOnChange}
                isSearchable={false}
              />
            </div>
            {cbs.map((cb) => (
              <ClaimableBalancesComponent
                key={cb.id}
                claimableData={cb}
              />
            ))}
          </div>
        </div>
      </ScrollBar>
    </>
  );
};

export default ClaimableBalances;

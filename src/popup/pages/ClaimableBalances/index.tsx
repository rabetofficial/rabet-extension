import React, { useEffect, useState } from 'react';

import Loading from 'popup/components/Loading';
import Nodata from 'popup/components/common/Nodata';
import Header from 'popup/components/common/Header';
import ScrollBar from 'popup/components/common/ScrollBar';
import ExtTitle from 'popup/components/common/Title/Ext';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import SelectOption from 'popup/components/common/SelectOption';
import ClaimableBalancesComponent from 'popup/blocks/ClaimableBalances';
import loadClaimableBalances from 'popup/features/loadClaimableBalances';
import { ClaimableBalanceDetailed } from 'popup/api/getClaimableBalances';

const ClaimableBalances = () => {
  const activeAccount = useActiveAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [cbs, setCbs] = useState<ClaimableBalanceDetailed[]>([]);

  const selectOptions = [
    { value: 'all', label: 'All', userText: '' },
    { value: 'upcoming', label: 'Pending', userText: ' pending' },
    { value: 'expired', label: 'Expired', userText: ' expired' },
    {
      value: 'claimable',
      label: 'Claimable',
      userText: ' claimable',
    },
  ];

  const [selected, setSelected] = useState(selectOptions[0]);

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

  const filteredCbs = cbs.filter(
    (cb) =>
      selected.value === 'all' || cb.status.status === selected.value,
  );

  return (
    <>
      <Header />

      <ScrollBar isHidden maxHeight={540}>
        <div className="content">
          <ExtTitle title="Claimable balance" className="mt-4" />

          <div style={{ height: !cbs.length && '160px' }}>
            <SelectOption
              height={176}
              className="mt-5"
              defaultValue={selectOptions[0]}
              selected={selected}
              variant="outlined"
              items={selectOptions}
              onChange={setSelected}
              isSearchable={false}
            />
          </div>

          {!filteredCbs.length ? (
            <Nodata
              msg={`You have no${selected.userText} claimable balances`}
              className="text-base"
            />
          ) : (
            filteredCbs.map((cb) => (
              <ClaimableBalancesComponent
                key={cb.id}
                claimableData={cb}
              />
            ))
          )}
        </div>
      </ScrollBar>
    </>
  );
};

export default ClaimableBalances;

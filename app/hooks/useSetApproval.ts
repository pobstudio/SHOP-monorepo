import { BigNumber } from 'ethers';
import { useState } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { TransactionStatus, useTransactionsStore } from '../stores/transaction';
import { useLondonContract } from './useContracts';
import { deployments } from '@pob/protocol';
import { CHAIN_ID, MAX_APPROVAL } from '../constants';

export const useSetApprove = () => {
  const { account } = useWeb3React();
  const london = useLondonContract();

  const addTransaction = useTransactionsStore((s) => s.addTransaction);
  const transactionMap = useTransactionsStore((s) => s.transactionMap);

  const [isApproving, setIsApproving] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [error, setError] = useState<any | undefined>(undefined);

  const approve = useCallback(
    async (gasPrice?: BigNumber) => {
      if (!account || !london) {
        return;
      }
      try {
        setIsApproving(true);
        const res = await london.approve(
          deployments[CHAIN_ID].poster,
          MAX_APPROVAL,
        );

        addTransaction(res.hash, {
          type: 'approval',
        });
        setIsApproving(false);
        setIsApproved(true);
        setError(undefined);
      } catch (e) {
        console.error(e);
        setIsApproving(false);
        setIsApproved(false);
        setError(e);
      }
    },
    [london, account],
  );

  const tx = useMemo(() => {
    const justAddedTxs = Object.values(transactionMap).filter(
      (tx) => !tx.lastBlockNumChecked && tx.metadata.type === 'approval',
    );
    const updatedTxs = Object.values(transactionMap)
      .filter(
        (tx) => !!tx.lastBlockNumChecked && tx.metadata.type === 'approval',
      )
      .sort(
        (a, b) =>
          (b.lastBlockNumChecked as number) - (a.lastBlockNumChecked as number),
      );
    const possibleTxs = [...justAddedTxs, ...updatedTxs];
    return possibleTxs[0];
  }, [transactionMap]);

  const txStatus: TransactionStatus | undefined = useMemo(() => tx?.status, [
    tx,
  ]);

  return useMemo(
    () => ({
      txStatus,
      approve,
      isApproved,
      isApproving,
      tx,
      error,
    }),
    [approve, txStatus, isApproved, isApproving, tx, error],
  );
};
import { FC, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { deployments } from '@pob/protocol';
import {
  useLondonContract,
  usePosterCheckoutContract,
} from '../hooks/useContracts';
import { useTokensStore } from '../stores/token';
import { useBlockchainStore } from '../stores/blockchain';
import { useTransactionsStore } from '../stores/transaction';
import { CHAIN_ID } from '../constants';

export const TokensEffect: FC = () => {
  const transactionMap = useTransactionsStore((s) => s.transactionMap);
  const blockNumber = useBlockchainStore((s) => s.blockNumber);
  const setApprovalBalance = useTokensStore((s) => s.setApprovalBalance);
  const setTokenBalance = useTokensStore((s) => s.setTokenBalance);
  const { account } = useWeb3React();
  const london = useLondonContract();
  const posterCheckout = usePosterCheckoutContract();

  useEffect(() => {
    if (!posterCheckout) {
      return;
    }
    if (!london) {
      return;
    }
    if (!account) {
      return;
    }
    london
      .allowance(account, deployments[CHAIN_ID].poster)
      .then((allowance: any) => {
        console.log(
          '$LONDON Allowance for PosterCheckout',
          allowance.toString(),
        );
        setApprovalBalance(allowance);
      });
    london.balanceOf(account).then(setTokenBalance);
  }, [posterCheckout, account, london, blockNumber]);

  return <></>;
};

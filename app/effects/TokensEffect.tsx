import { FC, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { deployments } from '@pob/protocol';
import {
  useLondonContract,
  usePrintServiceContract,
} from '../hooks/useContracts';
import { useTokensStore } from '../stores/token';
import { useBlockchainStore } from '../stores/blockchain';
import { useTransactionsStore } from '../stores/transaction';
import { CHAIN_ID } from '../constants';

export const TokensEffect: FC = () => {
  const transactionMap = useTransactionsStore((s) => s.transactionMap);
  const blockNumber = useBlockchainStore((s) => s.blockNumber);
  const setPrintServiceApprovalBalance = useTokensStore(
    (s) => s.setPrintServiceApprovalBalance,
  );
  const setTokenBalance = useTokensStore((s) => s.setTokenBalance);
  const { account } = useWeb3React();
  const london = useLondonContract();
  const printServiceContract = usePrintServiceContract();

  useEffect(() => {
    if (!printServiceContract) {
      return;
    }
    if (!london) {
      return;
    }
    if (!account) {
      return;
    }
    london
      .allowance(account, deployments[CHAIN_ID].printService)
      .then((allowance: any) => {
        console.log('$LONDON Allowance for PrintService', allowance.toString());
        setPrintServiceApprovalBalance(allowance);
      });
    london.balanceOf(account).then(setTokenBalance);
  }, [printServiceContract, account, london, blockNumber]);

  return <></>;
};

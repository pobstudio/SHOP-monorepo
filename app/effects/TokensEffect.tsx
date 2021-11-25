import { FC, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { deployments } from '@pob/protocol';
import {
  useLondonContract,
  usePosterContract,
  usePrintServiceContract,
} from '../hooks/useContracts';
import { useTokensStore } from '../stores/token';
import { useBlockchainStore } from '../stores/blockchain';
import { useTransactionsStore } from '../stores/transaction';
import { CHAIN_ID } from '../constants';

export const TokensEffect: FC = () => {
  const transactionMap = useTransactionsStore((s) => s.transactionMap);
  const blockNumber = useBlockchainStore((s) => s.blockNumber);
  const setPrintServiceLondonApprovalBalance = useTokensStore(
    (s) => s.setPrintServiceLondonApprovalBalance,
  );
  const setPosterBalance = useTokensStore((s) => s.setPosterBalance);
  const setPrintServicePosterApprovalBalance = useTokensStore(
    (s) => s.setPrintServicePosterApprovalBalance,
  );
  const setLondonBalance = useTokensStore((s) => s.setLondonBalance);
  const { account } = useWeb3React();
  const london = useLondonContract();
  const poster = usePosterContract();
  const printServiceContract = usePrintServiceContract();

  useEffect(() => {
    if (!printServiceContract) {
      return;
    }
    if (!london) {
      return;
    }
    if (!poster) {
      return;
    }
    if (!account) {
      return;
    }
    london
      .allowance(account, deployments[CHAIN_ID].printServiceV2)
      .then((allowance: any) => {
        // console.log('$LONDON Allowance: ', allowance);
        setPrintServiceLondonApprovalBalance(allowance);
      });
    london.balanceOf(account).then(setLondonBalance);

    poster
      .allowance(account, deployments[CHAIN_ID].printServiceV2)
      .then((allowance: any) => {
        // console.log('$POSTER Allowance: ', allowance);
        setPrintServicePosterApprovalBalance(allowance);
      });
    poster.balanceOf(account).then(setPosterBalance);
  }, [printServiceContract, account, london, poster, blockNumber]);

  return <></>;
};

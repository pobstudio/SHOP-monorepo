import { useMemo } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { useTokensStore } from '../stores/token';

export const useIsPrintServiceLondonApproved = (price: BigNumber) => {
  const allowance = useTokensStore((s) => s.printServiceLondonApprovalBalance);
  return useMemo(() => allowance.gte(price), [allowance]);
};

export const useIsPrintServicePosterApproved = (price: BigNumber) => {
  const allowance = useTokensStore((s) => s.printServicePosterApprovalBalance);
  return useMemo(() => allowance.gte(price), [allowance]);
};

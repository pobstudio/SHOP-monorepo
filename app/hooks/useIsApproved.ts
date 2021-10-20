import { useMemo } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { useTokensStore } from '../stores/token';

export const useIsPrintServiceApproved = (price: BigNumber) => {
  const allowance = useTokensStore((s) => s.printServiceApprovalBalance);
  return useMemo(() => allowance.gte(price), [allowance]);
};

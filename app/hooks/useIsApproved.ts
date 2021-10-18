import { useMemo } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { useTokensStore } from '../stores/token';

export const useIsApproved = (price: BigNumber) => {
  const allowance = useTokensStore((s) => s.approvalBalance);
  return useMemo(() => allowance.gte(price), [allowance]);
};

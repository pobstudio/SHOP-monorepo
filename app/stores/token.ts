import create from 'zustand';
import produce from 'immer';
import { BigNumber } from '@ethersproject/bignumber';
import { ZERO } from '../constants';

type State = {
  printServiceApprovalBalance: BigNumber;
  tokenBalance: BigNumber;
  setPrintServiceApprovalBalance: (
    printServiceApprovalBalance: BigNumber,
  ) => void;
  setTokenBalance: (tokenBalance: BigNumber) => void;
};

export const useTokensStore = create<State>((set, get) => ({
  printServiceApprovalBalance: ZERO,
  tokenBalance: ZERO,
  setTokenBalance: (tokenBalance: BigNumber) => {
    set(
      produce((s) => {
        s.tokenBalance = tokenBalance;
      }),
    );
  },
  setPrintServiceApprovalBalance: (printServiceApprovalBalance: BigNumber) => {
    set(
      produce((s) => {
        s.printServiceApprovalBalance = printServiceApprovalBalance;
      }),
    );
  },
}));

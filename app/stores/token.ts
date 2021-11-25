import create from 'zustand';
import produce from 'immer';
import { BigNumber } from '@ethersproject/bignumber';
import { ZERO } from '../constants';

type State = {
  printServiceLondonApprovalBalance: BigNumber;
  londonBalance: BigNumber;
  setPrintServiceLondonApprovalBalance: (
    printServiceApprovalBalance: BigNumber,
  ) => void;
  setLondonBalance: (tokenBalance: BigNumber) => void;
  printServicePosterApprovalBalance: BigNumber;
  posterBalance: BigNumber;
  setPrintServicePosterApprovalBalance: (
    printServiceApprovalBalance: BigNumber,
  ) => void;
  setPosterBalance: (tokenBalance: BigNumber) => void;
};

export const useTokensStore = create<State>((set, get) => ({
  printServiceLondonApprovalBalance: ZERO,
  londonBalance: ZERO,
  setPrintServiceLondonApprovalBalance: (balance: BigNumber) => {
    set(
      produce((s) => {
        s.printServiceLondonApprovalBalance = balance;
      }),
    );
  },
  setLondonBalance: (balance: BigNumber) => {
    set(
      produce((s) => {
        s.londonBalance = balance;
      }),
    );
  },
  printServicePosterApprovalBalance: ZERO,
  posterBalance: ZERO,
  setPrintServicePosterApprovalBalance: (balance: BigNumber) => {
    set(
      produce((s) => {
        s.printServicePosterApprovalBalance = balance;
      }),
    );
  },
  setPosterBalance: (balance: BigNumber) => {
    set(
      produce((s) => {
        s.posterBalance = balance;
      }),
    );
  },
}));

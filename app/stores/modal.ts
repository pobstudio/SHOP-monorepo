import create from 'zustand';

type State = {
  isWalletModalOpen: boolean;
  setIsWalletModalOpen: (s: boolean) => void;
};

export const useModalStore = create<State>((set, get) => ({
  isWalletModalOpen: false,
  setIsWalletModalOpen: (s) => set({ isWalletModalOpen: s }),
}));

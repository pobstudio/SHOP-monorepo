import create from 'zustand';

export const defaultCollection = 'london-gifts';

type State = {
  collection: string;
  setCollection: (collection: string) => void;
};

export const useCheckoutStore = create<State>((set) => ({
  collection: defaultCollection,
  setCollection: (collection: string) => set({ collection }),
}));

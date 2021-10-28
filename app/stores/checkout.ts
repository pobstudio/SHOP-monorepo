import create from 'zustand';

type State = {
  collection: string;
  setCollection: (collection: string) => void;
};

export const useCheckoutStore = create<State>((set) => ({
  collection: '',
  setCollection: (collection: string) => set({ collection }),
}));

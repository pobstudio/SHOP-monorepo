import create from 'zustand';

export const defaultCollection = 'london-gifts';
export const defaultCurrency = 'eth';
export type paymentCurrencyType = 'eth' | 'london';

type State = {
  paymentCurrency: paymentCurrencyType;
  setPaymentCurrency: (collection: paymentCurrencyType) => void;
  collection: string;
  setCollection: (collection: string) => void;
};

export const useCheckoutStore = create<State>((set) => ({
  paymentCurrency: defaultCurrency,
  setPaymentCurrency: (paymentCurrency: paymentCurrencyType) =>
    set({ paymentCurrency }),
  collection: defaultCollection,
  setCollection: (collection: string) => set({ collection }),
}));

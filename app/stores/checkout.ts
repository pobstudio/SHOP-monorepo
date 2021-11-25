import create from 'zustand';
import {
  PrintServiceCollectionRawType,
  PrintServiceProductType,
} from '../utils/airtable';

export type paymentCurrencyType = 'eth' | 'london' | 'poster';

export const defaultCollection: PrintServiceCollectionRawType = 'london-gifts';
export const defaultCurrency: paymentCurrencyType = 'eth';
export const defaultProduct: PrintServiceProductType = 'print0';

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
